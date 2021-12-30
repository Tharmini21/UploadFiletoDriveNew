import { RenewOAuth2TokenFunction } from '@smartsheet-bridge/extension-handler';
import { RenewOAuth2TokenResponse } from '@smartsheet-bridge/extension-handler/lib/responses/RenewOAuth2TokenResponse';
import { createHash } from 'crypto';
const {google} = require('googleapis');
// import { Settings } from './settings';

interface OAuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}
const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
const secret = "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";
const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);
const refreshAccessToken = (clientId: string,secret: string,code: string): Promise<OAuthToken> => {
  const token = oauth2Client.getToken(code);
  oauth2Client.credentials = token;
  return token;
};

export const onOAuthRenewToken: RenewOAuth2TokenFunction = (params) => {
  if (params.renewToken === undefined || params.renewToken === null || params.renewToken === '') 
  {
    throw new Error(
      'failed to refresh access token : renew token not specified'
    );
  }
  if (clientId === undefined || secret === undefined) {
    throw new Error(
      'failed to refresh access token : client identifier or secret not specified'
    );
  }

  return refreshAccessToken(clientId, secret, params.renewToken)
    .then(token => {
      return RenewOAuth2TokenResponse.create({
        access_token: token.access_token,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        token_type: token.token_type,
      });
    })
    .catch(err => {
      throw new Error(`failed to refresh access token : ${err.message}`);
    });
};