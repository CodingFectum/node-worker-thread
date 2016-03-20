"use strict";

const EventEmitter = require("eventemitter2").EventEmitter2;

class Request extends EventEmitter {
  constructor(body) {
    super();
    this.body = body;
  }

  success() {
    this.emit("success");
    this.emit("end");
  }

  error(err) {
    this.emit("error", err);
    this.emit("end");
  }
}

module.exports = Request;
