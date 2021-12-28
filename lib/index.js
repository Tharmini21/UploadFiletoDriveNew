"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const extension_handler_1 = require("@smartsheet-bridge/extension-handler");
const Uploadfile_1 = require("./Uploadfile");
const onOAuthStart_1 = require("./onOAuthStart");
const onOAuthHandleCode_1 = require("./onOAuthHandleCode");
// import { onOAuthRenewToken } from './onOAuthRenewToken';
exports.main = (0, extension_handler_1.createBridgeHandler)({
    onOAuthStart: onOAuthStart_1.onOAuthStart,
    onOAuthHandleCode: onOAuthHandleCode_1.onOAuthHandleCode,
    // onOAuthRenewToken
    modules: {
        Uploadfile: Uploadfile_1.Uploadfile,
    },
});
