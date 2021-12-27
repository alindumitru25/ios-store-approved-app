import io from "socket.io-client";
import { GLOBAL_URL } from "./../utils/Globals";

enum SOCKET_EVENTS {
  CONNECT = "connect",
  MESSAGE = "message",
  CONNECTION_ERR = "connection_error",
  ERROR = "error"
}

export default class Connection {
  private socket: any;
  constructor() {
    this.socket = io.connect(GLOBAL_URL);

    this.socket
      .on(SOCKET_EVENTS.CONNECT, () => {
        this.socket.on(SOCKET_EVENTS.MESSAGE, (from: any, message: any) => {
          alert("received message");
        });
      })
      .on(SOCKET_EVENTS.CONNECTION_ERR, (err: any) => {
        if (this.socket.socket) {
          this.socket.reconnect();
        } else {
          this.socket = io.connect(GLOBAL_URL);
        }
      })
      .on(SOCKET_EVENTS.ERROR, (err: any) => {
        if (this.socket.socket) {
          this.socket.socket.reconnect();
        } else {
          this.socket = io.connect(GLOBAL_URL);
        }
      });
  }

  getSocket() {
    return this.socket;
  }
}
