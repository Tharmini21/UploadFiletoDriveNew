"use strict";

var _crypto = require("crypto");

const {
  google
} = require('googleapis');

const getAccessToken = (clientId, secret, code) => {
  const sha256 = (0, _crypto.createHash)('sha256').update(`${secret}|${code}`).digest('hex');
  const client = google.createClient({});
  return client.tokens.getAccessToken({
    queryParameters: {
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      hash: sha256
    },
    contentType: 'application/x-www-form-urlencoded'
  });
}; // export const onOAuthHandleCode: HandleOAuth2CodeFunction<Settings> = (params, context) => 
// {
//   if (params.code === undefined || params.code === null || params.code === '') {
//     throw new Error(
//       'failed to create access token : authentication code not specified'
//     );
//   }
//   const { clientId, secret } = context.settings;
//   if (clientId === undefined || secret === undefined) {
//     throw new Error(
//       'failed to create access token : client identifier or secret has not been specified'
//     );
//   }
//   return getAccessToken(clientId, secret, params.code)
//     .then(token => {
//       return HandleOAuth2CodeResponse.create({
//         access_token: token.access_token,
//         expires_in: token.expires_in,
//         refresh_token: token.refresh_token,
//         token_type: token.token_type,
//       });
//     })
//     .catch(err => {
//       throw new Error(`failed to create access token : ${err.message}`);
//     });
// };