import test from "ava";
import Channel from "../src/channel";
import SampleRequest from "./sample-request";


test("initialize", t => {
  const channel = new Channel(10, () => t.truthy("factory" === "factory"));

  t.truthy(channel.running === true);
  t.truthy(channel.workRequests.length === 0);
  t.truthy(channel.isBusy === false);
  t.truthy(channel.workerCount === 0);
  t.truthy(channel.maxWorkerCount === 10);
  channel.workerFactory();
});

test("pause & resume", t => {
  const channel = new Channel(10, () => t.truthy("factory" === "factory"));
  t.truthy(channel.running === true);

  channel.pause();
  t.truthy(channel.running === false);

  channel.resume();
  t.truthy(channel.running === true);
});

test.cb("busy & accept", t => {
  const channel = new Channel(10, () => t.truthy("factory" === "factory"));
  t.truthy(channel.isBusy === false);

  channel.on("busy", () => {
    t.truthy(channel.isBusy === true);
    channel.accept();
  });

  channel.on("accept", () => {
    t.truthy(channel.isBusy === false);
    t.end();
  });
  channel.busy();
});

test("createWorker is busy", t => {
  const channel = new Channel(10, () => t.truthy("factory" === "factory"));
  channel.busy();

  const result = channel.createWorker();
  t.truthy(result === null);
  t.truthy(channel.workerCount === 0);
  t.truthy(channel.isBusy === true);
});

test("createWorker is not busy", t => {
  const channel = new Channel(10, () => {
    return {result: true, test: "ok"};
  });

  channel.on("busy", () => t.fail());
  const worker = channel.createWorker();
  t.truthy(worker.result === true);
  t.truthy(worker.test === "ok");
  t.truthy(channel.workerCount === 1);
  t.truthy(channel.isBusy === false);
});

test.cb("createWorker max count", t => {
  const channel = new Channel(10, () => {
    return {result: true, test: "ok"};
  });

  channel.on("busy", () => {
    t.truthy(channel.isBusy === true);
    t.truthy(channel.workerCount === 10);
    t.end();
  });
  for (var i = 0; i < 10; i++) {
    let worker = channel.createWorker();
    t.truthy(worker.result === true);
    t.truthy(worker.test === "ok");
  }
});

test.cb("addRequest, consume and run", t => {
  const channel = new Channel(1);
  const request  = new SampleRequest();
  channel.on("done", (err, req) => {
    t.truthy(err === null);
    t.truthy(req.isError === false);
    t.end();
  });

  const result = channel.addRequest(request);
  t.truthy(result.isError === false);
});
