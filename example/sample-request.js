"use strict";

const Request = require("../dist").Request;

class SampleRequest extends Request {
  constructor(body) {
    super();
    this.body = body;
  }

  execute() {
    const time = Math.random() * 10000;
    setTimeout(() => {
      console.log(`${this.body.count} is done. - ${time}`);
      this.emitSuccess();
    }, time);
  }
}

module.exports = SampleRequest;
