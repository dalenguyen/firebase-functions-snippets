// https://medium.com/@dalenguyen/working-with-firebase-functions-http-request-22fd1ab644d3

// Start a HTTP Request function

exports.request = functions.https.onRequest((request, response) => {
  // ...
});

//-----------------------------------

// Enable CORS (Allow ‘Access-Control-Allow-Origin’)

// Add CORS to your index.js
const cors = require('cors')({origin: true});
// Put this line to your function
// Automatically allow cross-origin requests
cors(req, res, () => {});

//-----------------------------------

// Check for request methods

if(request.method !== "POST"){
 res.status(400).send('Please send a POST request');
 return;
}

//-----------------------------------

// Get data from POST request

let data = request.body;
