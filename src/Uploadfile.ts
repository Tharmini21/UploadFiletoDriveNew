import { ModuleFunction } from '@smartsheet-bridge/extension-handler';
import fs from 'fs';
import * as path from 'path';
// const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
// const DataUri = require("datauri");
const request = require('request');
type fileParams = { Googledrivefolderid: string, filepath: string, filename: string, mimetype: string };



export const Uploadfile: ModuleFunction = (moduleParams, context) => {
  console.log("token:" + context.oAuthData.access_token);
  function createDriveClient() {
    const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
    const clientsecret = "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"
    const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback"
    const client = new google.auth.OAuth2(clientId, clientsecret, redirect_uri);
    client.setCredentials(context.oAuthData);
    return google.drive({
      version: 'v3',
      auth: client,
    });
  }
  const driveClient = createDriveClient()
  request(moduleParams.filepath, function (error: any, response: any, body: any) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  console.log("moduleParams",moduleParams);
  console.log("ImagePath",moduleParams.filepath);
  // const finalPath = path.resolve(__dirname, moduleParams.filepath);
  // if (!fs.existsSync(finalPath)) {
  //   throw new Error('File not found!');
  // }
  console.log(driveClient.files.create({
    requestBody: {
      name: moduleParams.filename,
      mimeType: moduleParams.mimetype,
      parents: moduleParams.Googledrivefolderid ? [moduleParams.Googledrivefolderid] : [],
    },
    media: {
      mimeType: moduleParams.mimetype,
      body: fs.createReadStream('C:/Users/Tharmini/Pictures/Screenshots/Screenshot (42).png'),
    },
    function(err: any, file: any) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.id);
      }
    }
  }));
};

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