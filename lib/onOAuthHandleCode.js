"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onOAuthHandleCode = void 0;

var _HandleOAuth2CodeResponse = require("@smartsheet-bridge/extension-handler/lib/responses/HandleOAuth2CodeResponse");

const {
  google
} = require('googleapis');

const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
const secret = "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";
const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);

const onOAuthHandleCode = params => {
  if (clientId === undefined || secret === undefined) {
    throw new Error('failed to create access token : client identifier or secret has not been specified');
  }

  if (params.code === undefined || params.code === null || params.code === '') {
    throw new Error('failed to create access token : authentication code not specified');
  }

  return oauth2Client.getToken(params.code).then(function (response) {
    console.log("tokens:", response.tokens);
    return _HandleOAuth2CodeResponse.HandleOAuth2CodeResponse.create({
      access_token: response.tokens.access_token,
      token_type: response.tokens.token_type
    });
  }).catch(function (err) {
    console.log(err);
    throw new Error(`failed to create access token : ${err.message}`);
  });
};

exports.onOAuthHandleCode = onOAuthHandleCode;