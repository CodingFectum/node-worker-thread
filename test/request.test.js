import test from "ava";
import Request from "../src/request";

test("emitSuccess", t => {
  const request = new Request();
  request.on("success", () => t.ok("success" === "success"));
  request.on("end", () => t.ok("end" === "end"));

  request.emitSuccess();
});

test("emitError", t => {
  const request = new Request();
  request.on("error", err => t.ok(err === "error"));
  request.on("end", () => t.ok("end" === "end"));

  request.emitError("error");
});
