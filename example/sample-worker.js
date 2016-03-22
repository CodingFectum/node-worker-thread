"use strict";

const Worker = require("../dist").Worker;

class SampleWorker extends Worker {
  constructor() {
    super();
  }

  process(req) {
    req.execute();

    req.on("success", () => {
      this.emitSuccess(req);
    });

    req.on("error", err => {
      this.emitError(err, req);
    });

    req.on("end", () => {
    });
  }
}

module.exports = SampleWorker;
