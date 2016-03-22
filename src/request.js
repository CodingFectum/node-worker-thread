"use strict";

const EventEmitter = require("eventemitter2").EventEmitter2;

class Request extends EventEmitter {
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

module.exports = Request;
