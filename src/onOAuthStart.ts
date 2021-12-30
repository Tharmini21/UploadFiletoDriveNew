import { StartOAuth2Function } from '@smartsheet-bridge/extension-handler';
import { StartOAuth2Response } from '@smartsheet-bridge/extension-handler/lib/responses/StartOAuth2Response';
// import { Settings } from './Settings';
const { google } = require('googleapis');

export const onOAuthStart: StartOAuth2Function = () => {
  // : StartOAuth2Function<Settings> = (
  //   params,
  //   context
  // ) => {
  //   const {   } = context;

  const oauthurl = "https://accounts.google.com/o/oauth2/auth";
  const tokenurl = "https://oauth2.googleapis.com/token";
  const scope = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata"
  ];
  const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
  const clientsecret = "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"
  const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback"
  const oauth2Client = new google.auth.OAuth2(clientId, clientsecret, redirect_uri);
  google.options({
    auth: oauth2Client
  });
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scope,
    response_type: "code"
  });
  const response = new StartOAuth2Response();
  response.setClientId(clientId);
  response.setOAuth2URI(oauthurl);
  response.setScope(
    "https://www.googleapis.com/auth/drive"
  );
  response.setComment("");
  return response;
  // return url;
};