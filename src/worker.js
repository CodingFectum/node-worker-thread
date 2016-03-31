import { EventEmitter2 } from "eventemitter2";

export default class Worker extends EventEmitter2 {
  constructor() {
    super();
  }

  process(req) {
    req.execute();
    req.on("done", err => {
      process.nextTick(() => this.done(err, req));
    });
  }
  release() {
    this.removeAllListeners();
  }

  done(err, req) {
    this.emit("done", err, req);
  }
}
