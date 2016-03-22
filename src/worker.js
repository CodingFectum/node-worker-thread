import { EventEmitter2 } from "eventemitter2";

export default class Worker extends EventEmitter2 {
  constructor() {
    super();
  }

  process(req) {}
  release() {
    this.removeAllListeners();
  }

  emitSuccess(req) {
    process.nextTick(() => {
      this.emit("success", req);
      this.emit("end", req);
    });
  }

  emitError(err, req) {
    process.nextTick(() => {
      this.emit("error", err, req);
      this.emit("end", req);
    });
  }
}
