import { HandleOAuth2CodeFunction } from '@smartsheet-bridge/extension-handler';
import { HandleOAuth2CodeResponse } from '@smartsheet-bridge/extension-handler/lib/responses/HandleOAuth2CodeResponse';
import { createHash } from 'crypto';
const { google } = require('googleapis');
const { fs } = require('fs');
const { readline } = require('readline');
const { http } = require('http');
const { url } = require('url');
import axios, { AxiosResponse } from 'axios';

interface OAuthToken {
  access_token: string;
  token_type: string;
  // scope: string;
  // expiry_date: Long;
}

const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
const secret = "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";
const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
const oauth2Client = new google.auth.OAuth2(clientId, secret, redirect_uri);

// const getAccessToken = (clientId: string,secret: string,code: string): Promise<OAuthToken> => {
//   const tokens = oauth2Client.getToken(code);
//   oauth2Client.credentials = tokens;
//   console.log("credentials:",oauth2Client.credentials);
//   console.log("token:",tokens);
//   return tokens;
// };


export const onOAuthHandleCode: HandleOAuth2CodeFunction = (params) => {
  if (clientId === undefined || secret === undefined) {
    throw new Error(
      'failed to create access token : client identifier or secret has not been specified'
    );
  }
  if (params.code === undefined || params.code === null || params.code === '') {
    throw new Error(
      'failed to create access token : authentication code not specified'
    );
  }
  return oauth2Client.getToken(params.code).then(function (response: any) {

    console.log("tokens:", response.tokens);
    // return response.tokens;
    return HandleOAuth2CodeResponse.create({
      access_token: response.tokens.access_token,
      token_type: response.tokens.token_type,
    });

    // console.log("Responsetoken:"+response.access_token);
    // console.log("ResponseType:"+response.token_type);
    // console.log("tokens:",tokens);

    //     return HandleOAuth2CodeResponse.create({
    //     access_token: response.access_token,
    //     token_type: response.token_type
    //   });

  }).catch(function (err: any) {
    console.log(err);
    throw new Error(`failed to create access token : ${err.message}`);
  });


};