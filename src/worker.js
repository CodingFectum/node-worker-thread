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

module.exports = Worker;
