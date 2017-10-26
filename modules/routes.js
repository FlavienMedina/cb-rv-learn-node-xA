const fs = require('fs');
const path = require('path');
const mLog = require('./mLog');
const http = require('http');
const url_ = require('url');
const uuid = require('uuid/v4');

exports.redirect = function(url, res, req) {
  let pathUrl = path.join(__dirname + "/../public" + url).split("?")[0];
  let query = url_.parse(url).query ? "[?" + url_.parse(url).query + "]" : " ";
  if (req.method === 'GET') {
    mLog.info(`SERVER RECEIVE ${req.method} REQUEST`);
    if (req.headers.cookie) {
      function parseCookies(request) {
        let list = {},
          rc = req.headers.cookie;
        rc && rc.split(';').forEach(function(cookie) {
          var parts = cookie.split('=');
          list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
        return list;
      }
      let cookie = parseCookies(req).sessionID;
      let data = fs.readFileSync('.sessions/' + cookie, 'utf8');
      console.log(data);
      res.setHeader('x-my-user-data', data);
    }
    if (fs.existsSync(pathUrl) && url != "/") {
      mLog.info(`${req.method} ${req.url.split("?")[0]} ${query}`);
      return fs.createReadStream(pathUrl).pipe(res);
    } else if (url === "/") {
      mLog.info(`${req.method} ${req.url.split("?")[0]} ${query}`);
      return fs.createReadStream(path.join(__dirname + "/../public/index.html")).pipe(res);
    } else {
      console.log(url);
      mLog.err(`The URL ${req.url} doesn't exist`);
      return fs.createReadStream(path.join(__dirname + "/../public/404.html")).pipe(res);
    }
  } else if (req.method === "POST" && url === '/add-session') {
    mLog.info(`SERVER RECEIVE ${req.method} REQUEST`);
    mLog.info(`${req.method} ${req.url.split("?")[0]} ${query}`);
    req.on('data', function(data) {
      let cookie = uuid(data);
      exports.cookie = cookie;
      res.setHeader('set-cookie', 'sessionID=' + cookie);
      res.setHeader('set-cookie', `sessionID=${cookie};expires=` +
        new Date(new Date().getTime()+60000).toGMTString());
      fs.appendFile(".sessions/" + cookie, data, function(err) {
        if (err) {
          mLog.err('Session not created')
        } else {
          mLog.succes('Session has been create')
        }
      });
    });
    req.on('end', function() {
      res.end();
    })
  }
};
