"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = void 0;

var _extensionHandler = require("@smartsheet-bridge/extension-handler");

var _Uploadfile = require("./Uploadfile");

var _onOAuthStart = require("./onOAuthStart");

var _onOAuthHandleCode = require("./onOAuthHandleCode");

// import { onOAuthRenewToken } from './onOAuthRenewToken';
const main = (0, _extensionHandler.createBridgeHandler)({
  onOAuthStart: _onOAuthStart.onOAuthStart,
  onOAuthHandleCode: _onOAuthHandleCode.onOAuthHandleCode,
  // onOAuthRenewToken
  modules: {
    Uploadfile: _Uploadfile.Uploadfile
  }
});
exports.main = main;