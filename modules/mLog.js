const colors = require('colors');
const moment = require('moment');
const date = "[" + moment().format('MMMM Do YYYY, h:mm:ss a') + "]";

exports.info = function (data) {
  console.log(`${date} INFO :: ${data}`.blue);
};
exports.succes = function (data) {
  console.log(`${date} SUCCES :: ${data}`.green);
};
exports.err = function (data) {
  console.log(`${date} ERR :: ${data}`.red);
};
exports.serv = function (data) {
  console.log(data.rainbow);
};
