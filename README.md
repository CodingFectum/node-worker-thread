worker-thread
=============

Worker Thread Pattern for Node.js

```
$ npm install worker-thread
```

## Sample

### Channel

```javascript
const Channel = require("worker-thread").Channel;
const SampleWorker = require("./sample-worker");
const SampleRequest = require("./sample-request");

const sampleChannel = new Channel(40, () => new SampleWorker());

sampleChannel.on("busy", () => console.log("SampleChannel is busy"));
sampleChannel.on("accept", () => console.log("SampleChannel is accept"));

sampleChannel.on("worker:success", req => console.log(`${req.body.count} is success`));
sampleChannel.on("worker:error", (err, req) => console.error(err, req));

for (var i = 0; i < 100; i++) {
  sampleChannel.addRequest(new SampleRequest({count: i}));
}
```

### Worker

```javascript
const Worker = require("worker-thread").Worker;

class SampleWorker extends Worker {
  constructor() {
    super();
  }

  process(req) {
    req.execute();

    req.on("success", () => this.emitSuccess(req));
    req.on("error", err => this.emitError(err, req));
    req.on("end", () => {});
  }
}

module.exports = SampleWorker;
```

### Request

```javascript
const Request = require("worker-thread").Request;

class SampleRequest extends Request {
  constructor(body) {
    super();
    this.body = body;
  }

  execute() {
    const time = Math.random() * 10000;
    setTimeout(() => {
      console.log(`${this.body.count} is done. - ${time}`);
      this.emitSuccess();
    }, time);
  }
}

module.exports = SampleRequest;
```
