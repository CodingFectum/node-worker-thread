const workerthread = require("../lib");
const SampleRequest = require("./sample-request");

const channel = new workerthread.Channel(1);
channel.on("busy", () => console.log("SampleChannel is busy"));
channel.on("accept", () => console.log("SampleChannel is accept"));
const request1 = new SampleRequest({count: 1});
const request2 = new SampleRequest({count: 2});

channel.addRequest(request1);
channel.addRequest(request2);

request1.on("done", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("request1 success");
  }
});

request2.on("done", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("request2 success");
  }
});
