import test from "ava";
import Request from "../src/request";

test.cb("done no error", t => {
  const request = new Request();
  request.on("done", err => {
    t.ok(err === null);
    t.end();
  });

  request.done(null);
});

test.cb("done error", t => {
  const request = new Request();
  request.on("done", err => {
    t.ok(err.error === true);
    t.end();
  });

  request.done({error: true});
});
