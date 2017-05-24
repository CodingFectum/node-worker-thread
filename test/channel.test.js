const test = require("ava");
const Channel = require("../src/channel");

function worker(i) {
  return i;
}

test.cb("executionCount = 0, execute -> stop", t => {
  const ch = new Channel(worker, 1);
  ch.on("stop", () => {
    t.is(ch.isRunning, false);
    t.end();
  });

  t.is(ch.executionCount, 0);
  t.is(ch.isRunning, true);

  ch.execute();
});

test("is not busy", t => {
  const ch = new Channel(worker, 1);

  t.is(ch.isBusy(), false);
});

test("is busy", t => {
  const ch = new Channel(worker, 1);
  ch.executionCount = 100;

  t.is(ch.isBusy(), true);
});
