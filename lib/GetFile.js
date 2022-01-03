"use strict";

const request = require('request');

const fs = require('fs');

const https = require('https');

const imageDownloader = require('node-image-downloader'); // request("http://google.com", function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
// https.get('https://www.google.com/images/srpr/logo3w.png', function (res) {
//   const fileStream = fs.createWriteStream("photo.png");
//   res.pipe(fileStream);
//   fileStream.on("finish", function () {
//     fileStream.close();
//     console.log("Outputfile", fileStream);
//     console.log("done");
//   });
// });


imageDownloader({
  imgs: [{
    uri: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    filename: 'my-image-file-name'
  }],
  dest: './upload' //destination folder

}).then(info => {
  console.log('all done', info);
}).catch((error, response, body) => {
  console.log('something goes bad!');
  console.log(error);
});