"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uploadfile = void 0;
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
function createDriveClient() {
    const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
    const clientsecret = "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";
    const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
    const client = new google.auth.OAuth2(clientId, clientsecret, redirect_uri);
    return google.drive({
        version: 'v3',
        auth: client,
    });
}
const Uploadfile = params => {
    const driveClient = createDriveClient();
    return driveClient.files.create({
        requestBody: {
            name: params.filename,
            mimeType: params.mimetype,
            parents: params.Googledrivefolderid ? [params.Googledrivefolderid] : [],
        },
        media: {
            mimeType: params.mimetype,
            body: fs.createReadStream(params.filepath),
        },
        function(err, file) {
            if (err) {
                // Handle error
                console.error(err);
            }
            else {
                console.log('File Id: ', file.id);
            }
        }
    });
};
exports.Uploadfile = Uploadfile;
// var fileMetadata = {
//   'name': 'photo.jpg'
// };
// var media = {
//   mimeType: 'image/jpeg',
//   body: fs.createReadStream('files/photo.jpg')
// };
// drive.files.create({
//   resource: fileMetadata,
//   media: media,
//   fields: 'id'
// }, function (err, file) {
//   if (err) {
//     // Handle error
//     console.error(err);
//   } else {
//     console.log('File Id: ', file.id);
//   }
// });
