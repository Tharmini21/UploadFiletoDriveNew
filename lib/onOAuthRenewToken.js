"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const { google } = require('googleapis');
const refreshAccessToken = (clientId, secret, refreshToken) => {
    const sha256 = (0, crypto_1.createHash)('sha256')
        .update(`${secret}|${refreshToken}`)
        .digest('hex');
    const client = google.createClient({});
    return client.tokens.getAccessToken({
        queryParameters: {
            client_id: clientId,
            grant_type: 'refresh_token',
            hash: sha256,
            refresh_token: refreshToken,
        },
        contentType: 'application/x-www-form-urlencoded',
    });
};
// export const onOAuthRenewToken: RenewOAuth2TokenFunction<Settings> = (params, context) => {
//   if (params.renewToken === undefined || params.renewToken === null || params.renewToken === '') 
//   {
//     throw new Error(
//       'failed to refresh access token : renew token not specified'
//     );
//   }
//   const { clientId, secret } = context.settings;
//   if (clientId === undefined || secret === undefined) {
//     throw new Error(
//       'failed to refresh access token : client identifier or secret not specified'
//     );
//   }
//   return refreshAccessToken(clientId, secret, params.renewToken)
//     .then(token => {
//       return RenewOAuth2TokenResponse.create({
//         access_token: token.access_token,
//         expires_in: token.expires_in,
//         refresh_token: token.refresh_token,
//         token_type: token.token_type,
//       });
//     })
//     .catch(err => {
//       throw new Error(`failed to refresh access token : ${err.message}`);
//     });
// };
