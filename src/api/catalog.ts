export type CatalogFeature = {
  catalog: SingleCatalogItem
  properties: Record<string, any>
}

export type SingleCatalogItem = {
  name: string
  class: string
  subclass?: string
  metadata: Record<string, string>
}

export const getCatalog: () => Promise<SingleCatalogItem[]> = async () => {
  const res = await fetch('./api/catalog.json');
  const data: SingleCatalogItem[] = await res.json();
  return data;
}
