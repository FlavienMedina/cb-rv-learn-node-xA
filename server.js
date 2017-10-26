const http = require('http');
const port = process.argv[2];
const mLog = require('./modules/mLog');
const routes = require('./modules/routes');

let server = http.createServer(function(req, res) {
  res.setHeader("Content-Type", "text/html");
  routes.redirect(req.url, res, req);
});
server.listen(port, () => {
  mLog.serv(`Listening on port: ${port}`);
});
