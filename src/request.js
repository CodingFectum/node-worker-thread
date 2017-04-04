"use strict";

const co = require("co");
const isGenerator = require("is-generator-function");

module.exports = (fn, args) => {
  if (isGenerator(fn)) {
    const promiseFn = co.wrap(fn);
    return Promise.resolve(promiseFn(args));
  }
  return Promise.resolve(fn(args));
};
