const Channel = require("./channel");
const SampleWorker = require("./sample-worker");

const sampleChannel = new Channel(40, () => {
  return new SampleWorker();
});

sampleChannel.on("busy", () => console.log("SampleChannel is busy"));
sampleChannel.on("accept", () => console.log("SampleChannel is accept"));

for (var i = 0; i < 100; i++) {
  sampleChannel.addRequest({count: i});
}
