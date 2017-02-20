const test = require("ava");
const wt = require("../src");

const twice = n => n * 2;
const twicePromise = n => Promise.resolve(n * 2);
function *twiceGenerator(num) {
  return yield twicePromise(num);
}

test.cb("function", t => {
  const ch = wt.createChannel(twice, 2);
  ch.on("done", (err, result) => {
    t.true(!err);
    t.true(result === 4);
    t.end();
  });

  ch.on("error", err => {
    t.fail(err);
    t.end();
  });

  ch.add(2);
});

test("stop", t => {
  const sampleChannel = wt.createChannel(twicePromise, 2);
  sampleChannel.stop();
});

test.cb("promise", t => {
  const ch = wt.createChannel(twicePromise, 2);
  ch.on("done", (err, result) => {
    t.true(!err);
    t.true(result === 4);
    t.end();
  });

  ch.on("error", err => {
    t.fail(err);
    t.end();
  });

  ch.add(2);
});

test.cb("generator function", t => {
  const ch = wt.createChannel(twiceGenerator, 2);
  ch.on("done", (err, result) => {
    t.true(!err);
    t.true(result === 4);
    t.end();
  });

  ch.on("error", err => {
    t.fail(err);
    t.end();
  });

  ch.add(2);
});
