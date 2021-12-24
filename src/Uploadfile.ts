import { ModuleFunction } from '@smartsheet-bridge/extension-handler';

type fileParams = { fileurl: string,filename: string,mimetype: string };

export const Uploadfile: ModuleFunction<fileParams> = params => {
  return { result: `Hello, ${params.filename}!` };
};