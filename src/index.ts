import { createBridgeHandler } from '@smartsheet-bridge/extension-handler';
import { Uploadfile } from './Uploadfile';

export const main = createBridgeHandler({
  modules: {
    Uploadfile: Uploadfile,
  },
});