import { CatalogDataItem } from "./catalog";

export const THIRD_PARTY_CATALOG: CatalogDataItem[] = [
  // TODO：カテゴリに変更し、公園・poi毎につけ消しができるように分ける
  {
    "type": "DataItem",
    "id": "thirdParty/OpenStreetMap",
    "shortId": "Osm",
    "name": "OpenStreetMap",
    "class": "v3",
    "sources": {
      "v3": {
          "type": "vector",
          "url": "https://tileserver.geolonia.com/v3/tiles.json?key=YOUR-API-KEY"
      }
    }
  }
]