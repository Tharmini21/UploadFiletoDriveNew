// // import { StartOAuth2Function } from '@smartsheet-bridge/extension-handler';
// import { StartOAuth2Params } from '@smartsheet-bridge/extension-handler/lib/handlers/handleOAuthStart';
// import { ExtensionHandlerEnhancer, SerializableObject } from '@smartsheet-extensions/handler';
// import { BridgeContext, BridgeFunction } from '../types';
// // type params = Record<string, any>;
// type context = Record<string, any>;
// type params = {
//     code: any
// };
// type context = {
//     clientId: string;
//     secret: string
// };
// export interface Settings extends SerializableObject {
//     params: code : ""
//     context: context = {
//         clientId: "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com",
//         secret: "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"
//     }
// }
// type StartOAuth2Function<Settings extends SerializableObject = SerializableObject> =
//     (parameters: Readonly<StartOAuth2Params>,
//         context: Readonly<OAuth2StartContext<Settings>>) => BridgeFunctionResponse<StartOAuth2Response>
"use strict";