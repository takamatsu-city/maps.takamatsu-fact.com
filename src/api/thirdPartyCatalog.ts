
export type ThirdPartyCatalogDataItem = {
  type: "DataItem"
  id: string
  shortId: string
  name: string
  style?: string
  sources?: { [key: string]: any }
  class: string
  layers: any[] | string      // レイヤーを配列で直接指定するか、URLで指定する
}

export type ThirdPartyCatalogCategory = {
  type: "Category"
  id: string
  shortId: string
  name: string
  style?: string
  sources?: { [key: string]: any }
  items: ThirdPartyCatalogDataItem[]
}


export type ThirdPartyCatalogItem = ThirdPartyCatalogDataItem | ThirdPartyCatalogCategory


export const getThirdPartyCatalog: () => Promise<ThirdPartyCatalogItem[]> = async () => {
  const res = await fetch('./api/thirdPartyCatalog.json');
  const data: ThirdPartyCatalogItem[] = await res.json();
  return data;
}