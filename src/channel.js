import { EventEmitter2 } from "eventemitter2";
import Worker from "./worker";

export default class Channel extends EventEmitter2 {
  constructor(count, workerFactoryFunction=()=> new Worker()) {
    super();
    this.running = true;
    this.workRequests = [];
    this.isBusy = false;
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

  addRequest(workRequest) {
    this.workRequests.push(workRequest);
    process.nextTick(() => this.consume());
    return workRequest;
  }

  accept() {
    this.isBusy = false;
    this.emit("accept");
  }

  busy() {
    this.isBusy = true;
    this.emit("busy");
  }

  createWorker() {
    if (this.isBusy) {
      return null;
    }

    const worker = this.workerFactory();
    this.workerCount++;

    if (this.workerCount >= this.maxWorkerCount) {
      this.busy();
    }

    return worker;
  }

  releaseWorker(worker) {
    const oldBusy = this.isBusy;
    worker.release();
    this.workerCount--;

    if (oldBusy && this.workerCount < this.maxWorkerCount) {
      process.nextTick(() => this.accept());
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
    if (worker === null) {
      return false;
    }

    worker.on("done", (err, req) => {
      this.releaseWorker(worker);
      this.emit("done", err, req);
      process.nextTick(() => this.consume());
    });

    worker.process(this.workRequests.shift());

    return true;
  }
}
