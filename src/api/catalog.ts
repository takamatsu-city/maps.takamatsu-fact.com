import { ThirdPartyCatalogDataItem } from "./thirdPartyCatalog"

export type CatalogFeature = {
  catalog: CatalogDataItem | ThirdPartyCatalogDataItem
  properties: Record<string, any>
}

export type CatalogVectorDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  class: string
  metadata: Record<string, string>
}

export type CatalogCustomSourceVectorDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  customDataSource: string
  customDataSourceLayer?: string
  class?: string
  metadata: Record<string, string>
}

export type CatalogGeoJSONDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  class: string
  geojsonEndpoint: string
  metadata: Record<string, string>
}

export type CatalogLiveLocationDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  class: string
  liveLocationId: string
  metadata: Record<string, string>
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

export const getCatalog: () => Promise<CatalogItem[]> = async () => {
  const res = await fetch('./api/catalog.json');
  const data: CatalogItem[] = await res.json();
  return data;
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
