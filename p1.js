const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const port = process.argv[2];

let server = http.createServer(function(req, res) {
  console.log(`Content-Type : ${res.headers['content-type']}`);
});
server.listen(port);
console.log(`Listening on port: ${port}`);
