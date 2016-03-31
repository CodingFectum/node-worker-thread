import test from "ava";
import Channel from "../src/channel";
import SampleRequest from "./sample-request";


test("initialize", t => {
  const channel = new Channel(10, () => t.ok("factory" === "factory"));

  t.ok(channel.running === true);
  t.ok(channel.workRequests.length === 0);
  t.ok(channel.isBusy === false);
  t.ok(channel.workerCount === 0);
  t.ok(channel.maxWorkerCount === 10);
  channel.workerFactory();
});

test("pause & resume", t => {
  const channel = new Channel(10, () => t.ok("factory" === "factory"));
  t.ok(channel.running === true);

  channel.pause();
  t.ok(channel.running === false);

  channel.resume();
  t.ok(channel.running === true);
});

test.cb("busy & accept", t => {
  const channel = new Channel(10, () => t.ok("factory" === "factory"));
  t.ok(channel.isBusy === false);

  channel.on("busy", () => {
    t.ok(channel.isBusy === true);
    channel.accept();
  });

  channel.on("accept", () => {
    t.ok(channel.isBusy === false);
    t.end();
  });
  channel.busy();
});

test("createWorker is busy", t => {
  const channel = new Channel(10, () => t.ok("factory" === "factory"));
  channel.busy();

  const result = channel.createWorker();
  t.ok(result === null);
  t.ok(channel.workerCount === 0);
  t.ok(channel.isBusy === true);
});

test("createWorker is not busy", t => {
  const channel = new Channel(10, () => {
    return {result: true, test: "ok"};
  });

  channel.on("busy", () => t.fail());
  const worker = channel.createWorker();
  t.ok(worker.result === true);
  t.ok(worker.test === "ok");
  t.ok(channel.workerCount === 1);
  t.ok(channel.isBusy === false);
});

test.cb("createWorker max count", t => {
  const channel = new Channel(10, () => {
    return {result: true, test: "ok"};
  });

  channel.on("busy", () => {
    t.ok(channel.isBusy === true);
    t.ok(channel.workerCount === 10);
    t.end();
  });
  for (var i = 0; i < 10; i++) {
    let worker = channel.createWorker();
    t.ok(worker.result === true);
    t.ok(worker.test === "ok");
  }
});

test.cb("addRequest, consume and run", t => {
  const channel = new Channel(1);
  const request  = new SampleRequest();
  channel.on("done", (err, req) => {
    t.ok(err === null);
    t.ok(req.isError === false);
    t.end();
  });

  const result = channel.addRequest(request);
  t.ok(result.isError === false);
});
