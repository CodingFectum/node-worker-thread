import { EventEmitter2 } from "eventemitter2";

export default class Request extends EventEmitter2 {
  constructor() {
    super();
  }

  execute() {}
  emitSuccess() {
    this.emit("success");
    this.emit("end");
  }

  emitError(err) {
    this.emit("error", err);
    this.emit("end");
  }
}
