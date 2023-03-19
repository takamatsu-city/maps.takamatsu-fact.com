const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const WS_PING_INTERVAL = 30_000; // 30 seconds
const WS_URL = 'wss://api-ws.geolonia.com/dev';

type WebSocketMessageEventDetail = {
  message: any
}
export class WebSocketMessageEvent extends CustomEvent<WebSocketMessageEventDetail> {}

class WebSocketController extends EventTarget {
  ws: WebSocket
  subscriptions: string[]

  constructor() {
    super();
    this.ws = this._startWebSocket();
    this.subscriptions = [];
    window.setTimeout(this._sendPing.bind(this), WS_PING_INTERVAL);
  }

  subscribe(channel: string) {
    this.ws.send(JSON.stringify({
      action: "subscribe",
      channel,
    }));
  }

  private _startWebSocket() {
    const ws = new WebSocket(WS_URL);
    ws.addEventListener('open', () => {
      // re-subscribe to any channels that we were previously connected to
      for (const channel of this.subscriptions) {
        this.subscribe(channel);
      }
      this.dispatchEvent(new Event('open'));
    });
    ws.addEventListener('close', async () => {
      await sleep(300);
      this.ws = this._startWebSocket();
    });
    ws.addEventListener('message', (message: MessageEvent<string>) => {
      const data = JSON.parse(message.data);
      if (data.msg === 'pong' && data.now) {
        // this._filterFeaturesByTTL(data.now);
      } else if (data.msg === 'subscribed') {
        if (!this.subscriptions.includes(data.channel)) {
          this.subscriptions.push(data.channel);
        }
      } else if (typeof data.id !== 'undefined') {
        console.log(data);
        this.dispatchEvent(new WebSocketMessageEvent('message', { detail: { message: data } }));
      } else {
        console.warn('Unrecognized WS message: ', message.data);
      }
    });
    return ws;
  }

  private _sendPing() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({"action": "ping"}));
    }
    window.setTimeout(this._sendPing.bind(this), WS_PING_INTERVAL);
  }
}

const controller = new WebSocketController();
export default controller;
