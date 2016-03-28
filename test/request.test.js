import test from "ava";
import Request from "../src/request";

test("emitSuccess", t => {
  const request = new Request();
  request.on("success", () => t.ok("success" === "success"));
  request.on("end", () => t.ok("end" === "end"));

  request.emitSuccess();
});
