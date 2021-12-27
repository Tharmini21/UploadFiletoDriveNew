"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uploadfile = void 0;

const Uploadfile = params => {
  return {
    result: `Hello, ${params.filename}!`
  };
};

exports.Uploadfile = Uploadfile;