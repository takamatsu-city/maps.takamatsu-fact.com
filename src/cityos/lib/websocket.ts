const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const WS_PING_INTERVAL = 30_000; // 30 seconds
const WS_URL = `wss://api-ws.geolonia.com/${process.env.API_STAGE || 'dev'}`;

type WebSocketMessageEventDetail = {
  message: any
}
export class WebSocketMessageEvent extends CustomEvent<WebSocketMessageEventDetail> {}

export type MessageCallbackFunc = (message: any) => void

class WebSocketController {
  ws: WebSocket
  subscriptions: { [key: string]: Set<MessageCallbackFunc> }

  constructor() {
    this.ws = this._startWebSocket();
    this.subscriptions = {};
    window.setTimeout(this._sendPing.bind(this), WS_PING_INTERVAL);
  }

  subscribe(channel: string, messageCallback: MessageCallbackFunc) {
    const callbacksForThisChannel = this.subscriptions[channel] ||= new Set();
    callbacksForThisChannel.add(messageCallback);

    // Send the subscribe message only if we are open.
    // We don't need to do this if we aren't open, because
    // we have an event handler listening for the open event
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        action: "subscribe",
        channel,
      }));
    }
  }

  unsubscribe(channel: string, messageCallback: MessageCallbackFunc) {
    const callbacksForThisChannel = this.subscriptions[channel] ||= new Set();
    callbacksForThisChannel.delete(messageCallback);
  }

  private _startWebSocket() {
    const ws = new WebSocket(WS_URL);
    ws.addEventListener('open', () => {
      // re-subscribe to any channels that we were previously connected to
      for (const channel of Object.keys(this.subscriptions)) {
        ws.send(JSON.stringify({
          action: "subscribe",
          channel,
        }));
      }
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
        // no-op, this is just a message verifying that we've been subscribed
      } else if (typeof data.id !== 'undefined') {
        const channel = data.chan;
        const callbacksForThisChannel = this.subscriptions[channel] || new Set();
        for (const callback of callbacksForThisChannel) {
          callback(data);
        }
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
