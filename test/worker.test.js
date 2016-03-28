import test from "ava";
import Worker from "../src/worker";

test("emitSuccess", t => {
  const worker = new Worker();
  worker.on("success", () => t.ok("success" === "success"));
  worker.on("end", () => t.ok("end" === "end"));

  worker.emitSuccess({});
});
