worker-thread
=============

Worker Thread Pattern for Node.js

```
$ npm install worker-thread
```

## Sample

### Channel

```javascript
const workerthread = require("worker-thread").Channel;
const SampleRequest = require("./sample-request");

const channel = new Channel(30);
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
      this.done(null);
    }, time);
  }
}

module.exports = SampleRequest;
```
