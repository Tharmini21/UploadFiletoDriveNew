"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uploadfile = void 0;

const readline = require('readline');

const {
  google
} = require('googleapis');

const request = require('request');

const fs = require('fs');

const https = require('https');

const imageDownloader = require('node-image-downloader');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var FileReader = require('filereader');

// var window:any = window.location;
const Uploadfile = async (moduleParams, context) => {
  function createDriveClient() {
    const clientId = "218866420163-28if048id8aij2l4iu567poivgvr1a87.apps.googleusercontent.com";
    const clientsecret = "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";
    const redirect_uri = "https://system.converse.ai/api/settings/oauth/oauth2callback";
    const client = new google.auth.OAuth2(clientId, clientsecret, redirect_uri);
    client.setCredentials(context.oAuthData);
    return google.drive({
      version: 'v3',
      auth: client
    });
  }

  ;
  const driveClient = createDriveClient();
  console.log("ImagePath", moduleParams.filepath);

  function download() {
    // window.location.href=moduleParams.filepath.toString();
    https.get(moduleParams.filepath, {
      responseType: 'arraybuffer'
    }).subscribe(data => {
      const bytes = new Uint8Array(data);
      const blob = new Blob([bytes], {
        type: 'image'
      });
      const urlCreator = window.URL || window['webkitURL'];
      this.imageData = urlCreator.createObjectURL(blob);
    }); // await saveFile(moduleParams.filename, finalPath, moduleParams.mimetype, moduleParams.folderId).catch((error: any) => {
    //   console.error(error);
    // });
  }

  download();

  function GetImage() {//  return https.get(moduleParams.filepath,{response})
    //     const fileStream=fs.createWriteStream(moduleParams.filename);
    //     res.pipe(fileStream);
    //     fileStream.on("finish",function(){
    //       fileStream.close();
    //       console.log("OutputfileNew",fileStream);
    //     });
    //   });
  }

  function saveFile(fileName, filePath, fileMimeType, folderId) {
    return driveClient.files.create({
      requestBody: {
        name: fileName,
        mimeType: fileMimeType,
        parents: folderId ? [folderId] : []
      },
      media: {
        mimeType: fileMimeType,
        body: fs.createReadStream(filePath)
      }
    });
  }

  ;
};

exports.Uploadfile = Uploadfile;