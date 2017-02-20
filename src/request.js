"use strict";

const co = require("co");

module.exports = (fn, args) => {
  if (isGenerator(fn)) {
    const promiseFn = co.wrap(fn);
    return Promise.resolve(promiseFn(args));
  }
  return Promise.resolve(fn(args));
};

function isGenerator(fn) {
  if (!(typeof fn == "function")) {
    return false;
  }
  return fn.constructor.name == "GeneratorFunction";
}
