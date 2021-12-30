"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onOAuthStart = void 0;

var _StartOAuth2Response = require("@smartsheet-bridge/extension-handler/lib/responses/StartOAuth2Response");

// import { Settings } from './Settings';
const {
  google
} = require('googleapis');

const onOAuthStart = () => {
  // : StartOAuth2Function<Settings> = (
  //   params,
  //   context
  // ) => {
  //   const {   } = context;
  const oauthurl = "https://accounts.google.com/o/oauth2/auth";
  const tokenurl = "https://oauth2.googleapis.com/token";
  const scope = ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive.appdata"];
  const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
  const clientsecret = "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";
  const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
  const oauth2Client = new google.auth.OAuth2(clientId, clientsecret, redirect_uri);
  google.options({
    auth: oauth2Client
  });
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scope,
    response_type: "code"
  });
  const response = new _StartOAuth2Response.StartOAuth2Response();
  response.setClientId(clientId);
  response.setOAuth2URI(oauthurl);
  response.setScope("https://www.googleapis.com/auth/drive");
  response.setComment("");
  return response; // return url;
};

exports.onOAuthStart = onOAuthStart;