"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onOAuthHandleCode = void 0;

const {
  google
} = require('googleapis');

const fs = require('fs');

const readline = require('readline');

const http = require('http');

const url = require('url');

const opn = require('open');

const destroyer = require('server-destroy');

const people = google.people('v1');
const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
const secret = "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";
const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);
google.options({
  auth: oauth2Client
});

async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/oauth2callback') > -1) {
          const qs = new url.URL(req.url, 'https://system.converse.ai/api/settings/oauth/oauth2callback').searchParams;
          res.end('Authentication successful! Please return to the console.');
          server.destroy();
          const {
            tokens
          } = await oauth2Client.getToken(qs.get('code'));
          oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates

          resolve(oauth2Client);
        }
      } catch (e) {
        reject(e);
      }
    });
    destroyer(server);
  });
}

const onOAuthHandleCode = () => {
  const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
  const secret = "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";
  const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
  const code = "";

  if (clientId === undefined || secret === undefined) {
    throw new Error('failed to create access token : client identifier or secret has not been specified');
  }

  if (code === undefined || code === null || code === '') {
    throw new Error('failed to create access token : authentication code not specified');
  }

  async function runSample() {
    // retrieve user profile
    const res = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses'
    });
    console.log(res.data);
  }

  const scopes = "https://www.googleapis.com/auth/drive";
  authenticate(scopes).then(client => runSample()).catch(console.error); // return getAccessToken(clientId, secret, code, redirect_uri)
  //   .then(token => {
  //     return HandleOAuth2CodeResponse.create({
  //       access_token: token.access_token,
  //       expires_in: token.expires_in,
  //       refresh_token: token.refresh_token,
  //       token_type: token.token_type,
  //     });
  //   })
  //   .catch(err => {
  //     throw new Error(`failed to create access token : ${err.message}`);
  //   });
};

exports.onOAuthHandleCode = onOAuthHandleCode;