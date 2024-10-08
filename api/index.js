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
const http = require("http");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const hostname = "localhost";
const port = process.env.PORT || 3000;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  const httpServer = http.createServer(server);
  httpServer.listen(port, hostname, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
});
