import { HandleOAuth2CodeFunction } from '@smartsheet-bridge/extension-handler';
import { HandleOAuth2CodeResponse } from '@smartsheet-bridge/extension-handler/lib/responses/HandleOAuth2CodeResponse';
import { createHash } from 'crypto';
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

interface OAuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

const getAccessToken = (
  clientId: string,
  secret: string,
  code: string,
  redirect_uri: string
): Promise<OAuthToken> => {
  const scope = "https://www.googleapis.com/auth/drive";
  const TOKEN_PATH = 'token.json';
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    secret,
    redirect_uri
  );
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  // GET /redirect_uri?code={authorizationCode}
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let authcode = authUrl.query.code;
  rl.question('Enter the code from that page here: ', (authcode: any) => {
    rl.close();
    oauth2Client.getToken(authcode, (err: any, token: any) => {
      if (err) return console.error('Error retrieving access token', err);
      oauth2Client.setCredentials(token);

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
        if (err) return console.error(err);
      });
      //callback(oauth2Client);
    });
  });

  oauth2Client.on('token', (token: any) => {
    if (token.refresh_token) {
      // store the refresh_token in my database!
      console.log(token.refresh_token);
    }
    console.log(token.access_token);
  });
  const sha256 = createHash('sha256').update(`${secret}|${code}`).digest('hex');

  return oauth2Client.getAccessToken({
    queryParameters: {
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code != undefined ? code : authcode,
      hash: sha256,
    },
    contentType: 'application/x-www-form-urlencoded',
  });
};

export const onOAuthHandleCode: HandleOAuth2CodeFunction = () => {
  // const queryString = window.location;
  // const urlParams = new URLSearchParams(queryString);
  // const code = urlParams.get('code')
  // if (params.code === undefined || params.code === null || params.code === '') {
  //   throw new Error(
  //     'failed to create access token : authentication code not specified'
  //   );
  // }

  //const { clientId, secret } = context.settings;
  const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
  const secret = "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"
  const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback"
  const code = ""
  if (clientId === undefined || secret === undefined) {
    throw new Error(
      'failed to create access token : client identifier or secret has not been specified'
    );
  }

  return getAccessToken(clientId, secret, code, redirect_uri)
    .then(token => {
      return HandleOAuth2CodeResponse.create({
        access_token: token.access_token,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        token_type: token.token_type,
      });
    })
    .catch(err => {
      throw new Error(`failed to create access token : ${err.message}`);
    });
};