"use strict";

const Request = require("../lib").Request;

class SampleRequest extends Request {
  constructor(body) {
    super();
    this.body = body;
  }

  execute() {
    const time = Math.random() * 10000;
    setTimeout(() => {
      console.log(`${this.body.count} is done. - ${time}`);
      this.done(null);
    }, time);
  }
}

module.exports = SampleRequest;
