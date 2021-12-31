import { ModuleFunction } from '@smartsheet-bridge/extension-handler';
// import fs from 'fs';
import { analytics } from 'googleapis/build/src/apis/analytics';
const readline = require('readline');
const { google } = require('googleapis');
const request = require('request');
import * as path from 'path';
const fs = require('fs');
const https = require('https');
type fileParams = { Googledrivefolderid: string, filepath: string, filename: string, mimetype: string };

export const Uploadfile: ModuleFunction = async (moduleParams, context) => {
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
  };
  const driveClient = createDriveClient();
  console.log("moduleParams", moduleParams);
  console.log("ImagePath", moduleParams.filepath);

  // console.log("Actual data:", request(moduleParams.filepath, function (error: any, response: any, body: any) {
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  // }));
  function saveimage(url: any, path: any) {
    var fullurl = url;
    var localpath = fs.createReadStream(path);
    var request = https.get(fullurl, function (response: any) {
      console.log("saveimg:", response);

      response.pipe(localpath);
    })
  }
  saveimage(moduleParams.filepath, "./upload/");

  var download = function (uri: any, filename: any, callback: any) {
    request.head(uri, function (err: any, res: any, body: any) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      console.log("OutputImage:", request(uri).pipe(fs.createWriteStream(filename)).on('close', callback));
      // const imgpath=_writableState.path
    });
  };
  download(moduleParams.filepath, moduleParams.filename, function () {
    // download(moduleParams.filepath, moduleParams.filename, saveFile (moduleParams.filename,moduleParams.filepath,moduleParams.mimeType,moduleParams.folderId) {
    // saveFile(name, finalPath, imgtype, folderId).catch((error: any) => {
    //   console.error(error);
    // });
    console.log('done');
  });
  console.log("downloaded Image:", download);
  const response = fetch(moduleParams.filepath, {
    method: 'GET',
    body: '',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  });
  if (response !== null) {
    console.log(response);
  }
  const name = JSON.stringify(moduleParams.fileName);
  const finalPath = JSON.stringify(moduleParams.filepath);
  const imgtype = JSON.stringify(moduleParams.mimetype);
  const folderId = JSON.stringify(moduleParams.Googledrivefolderid);
  // await saveFile(name, finalPath, imgtype, folderId).catch((error: any) => {
  //   console.error(error);
  // });

  function saveFile(fileName: string, filePath: string, fileMimeType: string, folderId?: string) {
    return driveClient.files.create({
      requestBody: {
        name: fileName,
        mimeType: fileMimeType,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: fileMimeType,
        body: fs.createReadStream(filePath),
      },
    });
  };
  // request({
  //   url: moduleParams.filepath,
  //   encoding: null
  // }, function (err: any, res: any, body: any) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(body)
  // });


  // console.log(driveClient.files.create({
  //   requestBody: {
  //     name: moduleParams.filename,
  //     mimeType: moduleParams.mimetype,
  //     parents: moduleParams.Googledrivefolderid ? [moduleParams.Googledrivefolderid] : [],
  //   },
  //   media: {
  //     mimeType: moduleParams.mimetype,
  //     body: fs.createReadStream(""),
  //     // body: fs.createReadStream(moduleParams.filepath),
  //   },
  //   function(err: any, file: any) {
  //     if (err) {
  //       // Handle error
  //       console.error(err);
  //     } else {
  //       console.log('File Id: ', file.id);
  //     }
  //   }
  // }));
};

function fetch(myUrl: any, arg1: { method: string; body: any; headers: { 'Content-Type': string; }; }) {
  console.log(arg1.body);
}



