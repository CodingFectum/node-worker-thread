import test from "ava";
import Worker from "../src/worker";
import SampleRequest from "./sample-request";

test.cb("done", t => {
  const worker = new Worker();
  worker.on("done", (err, req) => {
    t.ok(err === null);
    t.ok(req === "test");
    t.end();
  });

  worker.done(null, "test");
});

test.cb("process no error", t => {
  const request = new SampleRequest(false);
  const worker = new Worker();

  worker.on("done", (err, req) => {
    t.ok(err === null);
    t.end();
  });

  worker.process(request);
});

test.cb("process error", t => {
  const request = new SampleRequest(true);
  const worker = new Worker();

  worker.on("done", (err, req) => {
    t.ok(err === "error");
    t.end();
  });

  worker.process(request);
});
