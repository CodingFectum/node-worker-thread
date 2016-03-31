import { EventEmitter2 } from "eventemitter2";

export default class SampleRequest extends EventEmitter2 {
  constructor(isError=false) {
    super();
    this.isError = isError;
  }

  execute() {
    if (this.isError) {
      process.nextTick(() => this.emit("done", "error"));
    } else {
      process.nextTick(() => this.emit("done", null));
    }
  }
}
