import { StartOAuth2Function } from '@smartsheet-bridge/extension-handler';
import { StartOAuth2Response } from '@smartsheet-bridge/extension-handler/lib/responses/StartOAuth2Response';
// import { Settings } from './Settings';
const {google} = require('googleapis');

export const onOAuthStart : StartOAuth2Function = () =>{
// : StartOAuth2Function<Settings> = (
//   params,
//   context
// ) => {
//   const {   } = context;

const oauthurl= "https://accounts.google.com/o/oauth2/auth";
const tokenurl = "https://oauth2.googleapis.com/token";
const scope = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.appdata"
];
const clientId="218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
const clientsecret = "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"

const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback"

  if (clientId === undefined || clientId === null) {
    throw new Error('failed to start oauth flow : invalid client credentials');
  }
  function getAuthenticateButton(): string {
    const msg =
      '<p>To link this integration with a specific account authenticate with your Google Drive account.</p>';
    const btn =
      '<p><cv-button cv-click="authenticate()">Authenticate</cv-button></p>';
    return `<div>${msg}${btn}</div>`;
  }
  
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientsecret,
    redirect_uri
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
  });
  const response = new StartOAuth2Response();
  response.setClientId(clientId);
  response.setOAuth2URI(oauthurl);
  response.setScope(
    "https://www.googleapis.com/auth/drive"
  );
  response.setComment(getAuthenticateButton());
  return response;
};