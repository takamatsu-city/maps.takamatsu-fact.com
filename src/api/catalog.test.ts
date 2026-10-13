import { CatalogItem, filterUnavailableGeojsonItems } from "./catalog";

type FetchMock = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

const installFetchMock = (handler: (url: string) => { status: number } | "throw") => {
  const mock: FetchMock = async (input) => {
    const url = typeof input === "string" ? input : input.toString();
    const result = handler(url);
    if (result === "throw") {
      throw new Error(`network error: ${url}`);
    }
    return new Response(null, { status: result.status });
  };
  (global as unknown as { fetch: FetchMock }).fetch = mock;
};

const geojsonItem = (id: string, url: string): CatalogItem => ({
  type: "DataItem",
  id,
  shortId: id,
  name: id,
  class: id,
  geojsonEndpoint: url,
  metadata: {},
});

const vectorItem = (id: string): CatalogItem => ({
  type: "DataItem",
  id,
  shortId: id,
  name: id,
  class: id,
  metadata: {},
});

describe("filterUnavailableGeojsonItems", () => {
  afterEach(() => {
    delete (global as unknown as { fetch?: unknown }).fetch;
  });

  test("removes a geojson item whose endpoint returns 404", async () => {
    installFetchMock((url) => (url.endsWith("/missing.geojson") ? { status: 404 } : { status: 200 }));

    const input: CatalogItem[] = [
      geojsonItem("ok", "https://example.com/ok.geojson"),
      geojsonItem("missing", "https://example.com/missing.geojson"),
    ];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out.map((x) => x.id)).toEqual(["ok"]);
  });

  test("keeps a geojson item whose endpoint returns 200", async () => {
    installFetchMock(() => ({ status: 200 }));

    const input: CatalogItem[] = [geojsonItem("ok", "https://example.com/ok.geojson")];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("ok");
  });

  test("keeps non-geojson items (vector, customDataSource, liveLocation) without probing", async () => {
    const fetchCalls: string[] = [];
    installFetchMock((url) => {
      fetchCalls.push(url);
      return { status: 200 };
    });

    const input: CatalogItem[] = [
      vectorItem("vec"),
      {
        type: "DataItem",
        id: "cds",
        shortId: "cds",
        name: "cds",
        customDataSource: "src",
        metadata: {},
      },
      {
        type: "DataItem",
        id: "live",
        shortId: "live",
        name: "live",
        class: "live",
        liveLocationId: "abc",
        metadata: {},
      },
    ];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toHaveLength(3);
    expect(fetchCalls).toHaveLength(0);
  });

  test("keeps a geojson item when the probe throws (network error)", async () => {
    installFetchMock(() => "throw");

    const input: CatalogItem[] = [geojsonItem("ok", "https://example.com/ok.geojson")];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("ok");
  });

  test("keeps a geojson item on non-404 error responses (e.g. 500)", async () => {
    installFetchMock(() => ({ status: 500 }));

    const input: CatalogItem[] = [geojsonItem("ok", "https://example.com/ok.geojson")];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toHaveLength(1);
  });

  test("filters items inside a Category and keeps the category", async () => {
    installFetchMock((url) => (url.endsWith("/missing.geojson") ? { status: 404 } : { status: 200 }));

    const input: CatalogItem[] = [
      {
        type: "Category",
        id: "cat",
        shortId: "cat",
        name: "cat",
        items: [
          geojsonItem("ok", "https://example.com/ok.geojson"),
          geojsonItem("missing", "https://example.com/missing.geojson"),
        ],
      },
    ];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toHaveLength(1);
    const cat = out[0];
    if (cat.type !== "Category") throw new Error("expected Category");
    expect(cat.items.map((x) => x.id)).toEqual(["ok"]);
  });

  test("drops a Category whose items all become unavailable", async () => {
    installFetchMock(() => ({ status: 404 }));

    const input: CatalogItem[] = [
      {
        type: "Category",
        id: "cat",
        shortId: "cat",
        name: "cat",
        items: [geojsonItem("a", "https://example.com/a.geojson")],
      },
      geojsonItem("survivor", "https://example.com/survivor.geojson"),
    ];

    // survivor also 404s in this mock, so we expect both gone
    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toEqual([]);
  });

  test("handles nested categories recursively and drops empty parents", async () => {
    installFetchMock((url) => (url.endsWith("/missing.geojson") ? { status: 404 } : { status: 200 }));

    const input: CatalogItem[] = [
      {
        type: "Category",
        id: "outer",
        shortId: "outer",
        name: "outer",
        items: [
          {
            type: "Category",
            id: "innerAllMissing",
            shortId: "innerAllMissing",
            name: "innerAllMissing",
            items: [geojsonItem("a", "https://example.com/missing.geojson")],
          },
          {
            type: "Category",
            id: "innerOk",
            shortId: "innerOk",
            name: "innerOk",
            items: [geojsonItem("b", "https://example.com/ok.geojson")],
          },
        ],
      },
    ];

    const out = await filterUnavailableGeojsonItems(input);

    expect(out).toHaveLength(1);
    const outer = out[0];
    if (outer.type !== "Category") throw new Error("expected outer Category");
    expect(outer.items).toHaveLength(1);
    expect(outer.items[0].id).toBe("innerOk");
  });
});
