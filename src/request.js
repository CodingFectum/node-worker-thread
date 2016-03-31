import { EventEmitter2 } from "eventemitter2";

export default class Request extends EventEmitter2 {
  constructor() {
    super();
  }

  execute() {}
  done(err) {
    process.nextTick(() => this.emit("done", err));
  }
}
