import { Space } from "@spatial-id/javascript-sdk";
import websocket, { MessageCallbackFunc } from "./websocket";
import type GeoJSON from "geojson";

const WS_HTTP_URL = `https://api-ws-admin.geolonia.com/dev`;

const dataToGeoJSONFeature: (data: any) => GeoJSON.Feature = (data) => {
  let geometry: GeoJSON.Geometry;
  if (typeof data.msg.coords !== 'undefined') {
    geometry = { type: "Point", coordinates: data.msg.coords };
  } else {
    geometry = new Space(data.tilehash).toGeoJSON();
  }
  return {
    type: "Feature",
    id: data.id,
    properties: {
      tilehash: data.tilehash,
      zfxy: data.zfxy,
      ttl: data.ttl,
      ...data.msg,
    },
    geometry,
  };
};

type LiveDataSetEventDetail = {
  features: GeoJSON.Feature[];
}
export class LiveDataSetEvent extends CustomEvent<LiveDataSetEventDetail> {}

export default class LiveDataSet extends EventTarget {
  id: string;
  features: GeoJSON.Feature[];

  private _internalPingTimeout: number | undefined;
  private _wsMessageHandler: MessageCallbackFunc;

  constructor(id: string) {
    super();

    this.id = id;
    this.features = [];
    this._wsMessageHandler = (data) => {
      const newFeature = dataToGeoJSONFeature(data);
      this.features = [
        ...this.features.filter((feat) => feat.id !== data.id),
        newFeature,
      ];
      this.dispatchEvent(new LiveDataSetEvent('featuresUpdated', { detail: { features: this.features } }));
    };
    websocket.subscribe(this.id, this._wsMessageHandler);
    this._retrieveInitialDataSet().catch(e => {
      // ignore error for now
      console.warn(`Initial data set couldn't be loaded:`, e);
    });

    this._internalPing();
  }

  /** Call this when you no longer want to use this LiveDataSet. */
  remove() {
    if (this._internalPingTimeout) window.clearTimeout(this._internalPingTimeout);
    websocket.unsubscribe(this.id, this._wsMessageHandler);
  }

  private _filterFeaturesByTTL(nowTs?: number) {
    const now = typeof nowTs === 'undefined' ? Math.floor(new Date().getTime() / 1000) : nowTs;
    const filteredFeatures = this.features.filter((feat) => (
      !feat.properties?.ttl || (feat.properties?.ttl >= now)
    ));
    if (filteredFeatures.length !== this.features.length) {
      this.features = filteredFeatures;
      this.dispatchEvent(new LiveDataSetEvent('featuresUpdated', { detail: { features: this.features } }));
    }
  }

  private _startWebSocket() {
    websocket.subscribe(this.id, (data) => {

    });
  }

  private _internalPing() {
    this._filterFeaturesByTTL();
    this._internalPingTimeout = window.setTimeout(this._internalPing.bind(this), 300);
  }

  private async _retrieveInitialDataSet() {
    const initialDataResp = await fetch(`${WS_HTTP_URL}/channels/${this.id}/messages`);
    const initialDataJson = await initialDataResp.json();

    this.features = initialDataJson.data.map((data: any) => {
      return dataToGeoJSONFeature(data);
    });
    this.dispatchEvent(new LiveDataSetEvent('featuresUpdated', { detail: { features: this.features } }));
  }
}
