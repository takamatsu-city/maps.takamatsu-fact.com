export type CatalogFeature = {
  catalog: CatalogDataItem
  properties: Record<string, any>
}

export type CatalogVectorDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  class: string
  metadata: { attributesOrder?: string[] } & { [key: string]: string }
  minZoom?: number;
  maxZoom?: number;
}

export type CatalogCustomSourceVectorDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  customDataSource: string
  customDataSourceLayer?: string
  class?: string
  metadata: { attributesOrder?: string[] } & { [key: string]: string }
  minZoom?: number;
  maxZoom?: number;
}

export type CatalogGeoJSONDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  class: string
  geojsonEndpoint: string
  metadata: { attributesOrder?: string[] } & { [key: string]: string }
  minZoom?: number;
  maxZoom?: number;
}

export type CatalogLiveLocationDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  class: string
  liveLocationId: string
  metadata: { attributesOrder?: string[] } & { [key: string]: string }
  minZoom?: number;
  maxZoom?: number;
}

export type CatalogDataItem = CatalogVectorDataItem | CatalogCustomSourceVectorDataItem | CatalogGeoJSONDataItem | CatalogLiveLocationDataItem;

export type CatalogCategory = {
  type: "Category"
  id: string
  shortId: string
  name: string
  items: CatalogItem[]
}

export type CatalogItem = CatalogDataItem | CatalogCategory

const probeIsAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status !== 404;
  } catch {
    return true;
  }
}

export const filterUnavailableGeojsonItems = async (items: CatalogItem[]): Promise<CatalogItem[]> => {
  const urls = new Set<string>();
  for (const item of walkCategories(items)) {
    if ("geojsonEndpoint" in item) {
      urls.add(item.geojsonEndpoint);
    }
  }

  const probeResults = await Promise.all(
    [...urls].map(async (url) => [url, await probeIsAvailable(url)] as const),
  );
  const availability = new Map(probeResults);

  const filter = (items: CatalogItem[]): CatalogItem[] => {
    const out: CatalogItem[] = [];
    for (const item of items) {
      if (item.type === "Category") {
        const filteredItems = filter(item.items);
        if (filteredItems.length > 0) {
          out.push({ ...item, items: filteredItems });
        }
      } else if ("geojsonEndpoint" in item && availability.get(item.geojsonEndpoint) === false) {
        // 404 — drop this item
      } else {
        out.push(item);
      }
    }
    return out;
  };

  return filter(items);
}

export const getCatalog: () => Promise<CatalogItem[]> = async () => {
  const res = await fetch('./api/catalog.json');
  const data: CatalogItem[] = await res.json();
  return filterUnavailableGeojsonItems(data);
}

export function *walkCategories(data: CatalogItem[]): Generator<CatalogDataItem, void, unknown> {
  for (const x of data) {
    if (x.type === "Category") {
      yield *walkCategories(x.items);
    } else {
      yield x;
    }
  }
}
