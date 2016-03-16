"use strict";

const Worker = require("./worker-thread").Worker;

class SampleWorker extends Worker {
  constructor() {
    super();
  }

  process(req) {
    const time = Math.random() * 10000;
    setTimeout(() => {
      console.log(`${req.body.count} is done. - ${time}`);
      this.emitSuccess("ok");
    }, time);
  }
}

module.exports = SampleWorker;
