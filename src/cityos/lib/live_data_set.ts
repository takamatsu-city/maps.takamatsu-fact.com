import { Space } from "@spatial-id/javascript-sdk";
import type GeoJSON from "geojson";

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const WS_PING_INTERVAL = 30_000; // 30 seconds
const WS_URL = 'wss://api-ws.geolonia.com/dev';
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
  ws: WebSocket | undefined;
  features: GeoJSON.Feature[];

  private _removed: boolean;
  private _internalPingTimeout: number | undefined;
  private _pingTimeout: number | undefined;

  constructor(id: string) {
    super();

    this._removed = false;
    this.id = id;
    this.features = [];
    this._startWebSocket();
    this._retrieveInitialDataSet().catch(e => {
      // ignore error for now
      console.warn(`Initial data set couldn't be loaded:`, e);
    });

    this._pingTimeout = window.setTimeout(this._sendPing.bind(this), WS_PING_INTERVAL);
    this._internalPing();
  }

  /** Call this when you no longer want to use this LiveDataSet. */
  remove() {
    this._removed = true;
    if (this._pingTimeout) window.clearTimeout(this._pingTimeout);
    if (this._internalPingTimeout) window.clearTimeout(this._internalPingTimeout);
    this.ws?.close();
    this.ws = undefined;
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
    const ws = new WebSocket(WS_URL);
    this.ws = ws;
    this.ws.addEventListener('open', () => {
      ws.send(JSON.stringify({
        action: "subscribe",
        channel: this.id,
      }));
    });

    this.ws.addEventListener('close', async () => {
      if (this._removed) return;
      await sleep(100);
      this._startWebSocket();
    });

    this.ws.addEventListener('message', (message: MessageEvent<string>) => {
      const data = JSON.parse(message.data);
      if (data.msg === 'pong' && data.now) {
        this._filterFeaturesByTTL(data.now);
      } else if (typeof data.id !== 'undefined') {
        const newFeature = dataToGeoJSONFeature(data);
        this.features = [
          ...this.features.filter((feat) => feat.id !== data.id),
          newFeature,
        ];
        this.dispatchEvent(new LiveDataSetEvent('featuresUpdated', { detail: { features: this.features } }));
      }
    });
  }

  private _internalPing() {
    this._filterFeaturesByTTL();
    this._internalPingTimeout = window.setTimeout(this._internalPing.bind(this), 300);
  }

  private _sendPing() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({"action": "ping"}));
    }
    this._pingTimeout = window.setTimeout(this._sendPing.bind(this), WS_PING_INTERVAL);
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
