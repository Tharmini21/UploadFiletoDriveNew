import { HandleOAuth2CodeFunction } from '@smartsheet-bridge/extension-handler';
import { HandleOAuth2CodeResponse } from '@smartsheet-bridge/extension-handler/lib/responses/HandleOAuth2CodeResponse';
import { createHash } from 'crypto';
const {google} = require('googleapis');

interface OAuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

const getAccessToken = (
  clientId: string,
  secret: string,
  code: string
): Promise<OAuthToken> => {
  const sha256 = createHash('sha256').update(`${secret}|${code}`).digest('hex');

  const client = google.createClient({});
  return client.tokens.getAccessToken({
    queryParameters: {
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      hash: sha256,
    },
    contentType: 'application/x-www-form-urlencoded',
  });
};

// export const onOAuthHandleCode: HandleOAuth2CodeFunction<Settings> = (params, context) => 
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