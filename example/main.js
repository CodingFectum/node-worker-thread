const workerthread = require("../lib");
const SampleRequest = require("./sample-request");

const channel = new workerthread.Channel(30);
channel.on("busy", () => console.log("SampleChannel is busy"));
channel.on("accept", () => console.log("SampleChannel is accept"));

channel.on("done", (err, req) => {
  if (err) {
    console.log(err);
  }
  console.log(`Channel#done - ${req.body.count}`);
});

for (var i = 0; i < 100; i++) {
  var req = new SampleRequest({count: i});
  channel.addRequest(req);

  req.on("done", err => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`request done - ${req.body.count}`);
  });
}
