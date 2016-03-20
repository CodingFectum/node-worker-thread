"use strict";

const EventEmitter = require("eventemitter2").EventEmitter2;
const Request = require("./request");

class Channel extends EventEmitter {
  constructor(count, workerFactoryFunction) {
    super();
    this.running = true;
    this.workRequests = [];
    this.budy = false;
    this.workerFactory = workerFactoryFunction;
    this.workerCount = 0;
    this.maxWorkerCount = count;
  }

  pause() {
    this.running = false;
  }

  resume() {
    this.running = true;
  }

  addRequest(req) {
    const workRequest = new Request(req);
    this.workRequests.push(workRequest);
    process.nextTick(() => this.consume());
    return workRequest;
  }

  accept() {
    return !this.busy;
  }

  createWorker() {
    if (this.busy) {
      return null;
    }

    const worker = this.workerFactory();
    this.workerCount++;

    if (this.workerCount >= this.maxWorkerCount) {
      this.busy = true;
      process.nextTick(() => this.emit("busy"));
    }

    return worker;
  }

  releaseWorker(worker) {
    const oldBusy = this.busy;
    worker.release();
    this.workerCount--;

    if (oldBusy && this.workerCount < this.maxWorkerCount) {
      process.nextTick(() => {
        this.busy = false;
        this.emit("accept");
      });
    }
  }

  consume() {
    while(this.running && this.workRequests.length > 0) {
      if (!this.run()) {
        break;
      }
    }
  }

  run() {
    const worker = this.createWorker();
    if (worker == null) {
      return false;
    }
    const workerReq = this.workRequests.shift();
    worker.on("error", (err, data) => {
      workerReq.error(err);
    });

    worker.on("success", (err, data) => {
      workerReq.success(err, data);
    });

    worker.on("end", req => {
      this.releaseWorker(worker);
      process.nextTick(() => this.consume());
    });


    worker.process(workerReq);

    return true;
  }
}

module.exports = Channel;
