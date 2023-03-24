import type { Map as GeoloniaMap, GeoJSONSource } from "maplibre-gl";
import turfBBox from "@turf/bbox";
import LiveDataSet, { LiveDataSetEvent } from "./lib/live_data_set";

type FeatureFilter = (feature: GeoJSON.Feature) => GeoJSON.Feature;

class CityOS__Takamatsu {
  map: GeoloniaMap;
  liveDataSets: LiveDataSet[];

  constructor(map: GeoloniaMap) {
    this.map = map;
    this.liveDataSets = [];
  }

  addLiveDataSet(id: string, options?: { featureFilter?: FeatureFilter, stayFitToBounds?: boolean }) {
    const internalId = `cityos-kawaga-takamatsu-${id}`;
    const mapSourceId = `gl-live-data-${id}`;

    const existingLds = this.liveDataSets.find(lds => lds.id === internalId);
    if (typeof existingLds !== 'undefined') {
      // this live data set is already added to the map
      return mapSourceId;
    }
    const lds = new LiveDataSet(internalId);
    const stayFitToBounds = !!options?.stayFitToBounds;

    this.map.addSource(mapSourceId, {
      type: 'geojson',
      data: { type: "FeatureCollection", features: [] },
    });

    lds.addEventListener('featuresUpdated', (_event) => {
      const event = _event as LiveDataSetEvent;
      const features = event.detail.features.map(feature => {
        const props = {...feature.properties};
        // props.class = options?.layerName || 'undefined';
        // props._viewer_selectable = true;
        delete props.tilehash;
        delete props.ttl;
        delete props.coords;
        feature.properties = props;
        return options?.featureFilter ? options.featureFilter(feature) : feature;
      });
      const data: GeoJSON.FeatureCollection = {type: "FeatureCollection", features};
      (this.map.getSource(mapSourceId) as GeoJSONSource).setData(data);
      if (stayFitToBounds && data.features.length > 0) {
        const bbox = turfBBox(data);
        // we only have 2d data in here
        if (bbox.length === 4) {
          this.map.fitBounds(bbox, { maxZoom: 13, padding: 100, animate: false });
        }
      }
    });
    this.liveDataSets.push(lds);

    return mapSourceId;
  }

  removeLiveDataSet(id: string) {
    const sourceId = `gl-live-data-${id}`;
    const internalId = `cityos-kawaga-takamatsu-${id}`;
    const liveDataSetIndex = this.liveDataSets.findIndex((lds) => lds.id === internalId);
    if (liveDataSetIndex === -1) return;

    for (const layer of this.map.getStyle().layers) {
      if ('source' in layer && layer.source === sourceId) {
        this.map.removeLayer(layer.id);
      }
    }
    this.map.removeSource(sourceId);
    const [lds] = this.liveDataSets.splice(liveDataSetIndex, 1);
    lds.remove();
  }
}

export default CityOS__Takamatsu;
