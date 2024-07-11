import { CatalogDataItem } from "./api/catalog";
import { OSM_LAYER } from "./thirdPartyStyles/osmLayer";

export const THIRD_PARTY_CATALOG: CatalogDataItem[] = [
  {
    "type": "DataItem",
    "id": "thirdParty/OpenStreetMap",
    "shortId": "Osm",
    "name": "OpenStreetMap",
    "class": "v3",
    "layers": OSM_LAYER
  }
]