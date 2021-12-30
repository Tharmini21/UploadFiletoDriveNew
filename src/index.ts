import { createBridgeHandler } from '@smartsheet-bridge/extension-handler';
import { Uploadfile } from './Uploadfile';
import { onOAuthStart } from './onOAuthStart';
import { onOAuthHandleCode } from './onOAuthHandleCode';
import { onOAuthRenewToken } from './onOAuthRenewToken';

export const main = createBridgeHandler({
  onOAuthStart,
  onOAuthHandleCode,
  onOAuthRenewToken,
  modules: {
    Uploadfile: Uploadfile,
  },
});