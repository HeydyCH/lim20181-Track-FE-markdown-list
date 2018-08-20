var request = require('request');
request('"https://developers.google.com/v8/', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body.status); // Print the HTML for the Google homepage.
});


// https://github.com/MichelleSV -- status 404
// https://github.com/HeydyCH -- status 200
