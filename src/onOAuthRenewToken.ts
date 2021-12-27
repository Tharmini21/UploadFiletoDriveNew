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

const refreshAccessToken = (
  clientId: string,
  secret: string,
  refreshToken: string
): Promise<OAuthToken> => {
  const sha256 = createHash('sha256')
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