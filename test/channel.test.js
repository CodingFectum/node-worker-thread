import test from "ava";
import Channel from "../src/channel";

test("initialize", t => {
  const channel = new Channel(10, () => t.ok("factory" === "factory"));

  t.ok(channel.running === true);
  t.ok(channel.workRequests.length === 0);
  t.ok(channel.busy === false);
  t.ok(channel.workerCount === 0);
  t.ok(channel.maxWorkerCount === 10);
  channel.workerFactory();
});
