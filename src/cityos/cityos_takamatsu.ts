import type { Map as GeoloniaMap, GeoJSONSource } from "maplibre-gl";
import turfBBox from "@turf/bbox";
import LiveDataSet, { LiveDataSetEvent } from "./lib/live_data_set";
import { WEB_COLORS } from "../utils/mapStyling";

class CityOS__Takamatsu {
  map: GeoloniaMap;
  liveDataSets: LiveDataSet[];

  constructor(map: GeoloniaMap) {
    this.map = map;
    this.liveDataSets = [];
  }

  addLiveDataSet(id: string, options?: { stayFitToBounds?: boolean }) {
    const color = WEB_COLORS[Math.random() * WEB_COLORS.length];
    const internalId = `cityos-kawaga-takamatsu-${id}`;

    const existingLds = this.liveDataSets.find(lds => lds.id === internalId);
    if (typeof existingLds !== 'undefined') {
      // this live data set is already added to the map
      return existingLds;
    }
    const lds = new LiveDataSet(internalId);
    const sourceId = `gl-live-data-${id}`;

    const stayFitToBounds = !!options?.stayFitToBounds;

    this.map.addSource(sourceId, {
      type: 'geojson',
      data: { type: "FeatureCollection", features: [] },
    });
    this.map.addLayer({
      id: `gl-live-data-${id}-points`,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': 7,
        'circle-color': color,
        'circle-opacity': .8,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'gray',
        'circle-stroke-opacity': 1,
      }
    });


    lds.addEventListener('featuresUpdated', (_event) => {
      const event = _event as LiveDataSetEvent;
      const features = event.detail.features;
      const data: GeoJSON.FeatureCollection = {type: "FeatureCollection", features};
      (this.map.getSource(sourceId) as GeoJSONSource).setData(data);
      if (stayFitToBounds && data.features.length > 0) {
        const bbox = turfBBox(data);
        // we only have 2d data in here
        if (bbox.length === 4) {
          this.map.fitBounds(bbox, { maxZoom: 13, padding: 100, animate: false });
        }
      }
    });
    this.liveDataSets.push(lds);
    return lds;
  }

  removeLiveDataSet(id: string) {
    const internalId = `cityos-kawaga-takamatsu-${id}`;

  }
}

export default CityOS__Takamatsu;
