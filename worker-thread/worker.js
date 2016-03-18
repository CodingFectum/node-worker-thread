"use strict";

const EventEmitter = require("eventemitter2").EventEmitter2;

class Worker extends EventEmitter {
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
      this.emit("complete", req);
    });
  }

  emitError(err, req) {
    process.nextTick(() => {
      this.emit("error", err, req);
      this.emit("complete", req);
    });
  }
}

module.exports = Worker;
