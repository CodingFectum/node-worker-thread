import test from "ava";
import Worker from "../src/worker";

test("emitSuccess", t => {
  const worker = new Worker();
  worker.on("success", req => t.ok(req === "test"));
  worker.on("end", req => t.ok(req === "test"));

  worker.emitSuccess("test");
});

test("emitError", t => {
  const worker = new Worker();
  worker.on("error", (err, req) => {
    t.ok(err === null);
    t.ok(req === "test");
  });
  worker.on("end", req => t.ok(req === "test"));

  worker.emitError(null, "test");
});
