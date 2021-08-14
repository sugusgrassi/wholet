//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001
const path = require("path")
const express = require("express");
// const cors = require("cors");

//middleware
// app.use(cors());
// app.use(express.json()); //req.body

// app.use(express.static("./client/build"))
// app.use(express.static(path.join(__dirname, "client/build"))) 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}

// console.log(path.join(__dirname, "client/build"))
// Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
conn.sync().then(() => {
  // console.log("conecta!")
  app.listen(PORT, '0.0.0.0');
});
