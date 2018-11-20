const Koa = require('koa');
var Router = require('koa-router');
const userModule = require('./src/modules/login/login');
const refreshModule = require('./src/modules/refresh/refresh');
const https = require('https');
const http = require('http');

const app = new Koa();
var router = new Router();
 
router.use('/auth', userModule.routes());
router.use('/refresh', refreshModule.routes());

app.use(router.routes()).use(router.allowedMethods());

// app.listen(3000);


var config = {
    domain: 'localhost',
    http: {
      port: 8989,
    },
    https: {
      port: 7979,
      options: {
        // key: fs.readFileSync(path.resolve(process.cwd(), 'certs/privkey.pem'), 'utf8').toString(),
        // cert: fs.readFileSync(path.resolve(process.cwd(), 'certs/fullchain.pem'), 'utf8').toString(),
      },
    },
  };
  
  let serverCallback = app.callback();
  try {
    var httpServer = http.createServer(serverCallback);
    httpServer
      .listen(config.http.port, function(err) {
        if (!!err) {
          console.error('HTTP server FAIL: ', err, (err && err.stack));
        }
        else {
          console.log(`HTTP  server OK: http://${config.domain}:${config.http.port}`);
        }
      });
  }
  catch (ex) {
    console.error('Failed to start HTTP server\n', ex, (ex && ex.stack));
  }
  try {
    var httpsServer = https.createServer(config.https.options, serverCallback);
    httpsServer
      .listen(config.https.port, function(err) {
        if (!!err) {
          console.error('HTTPS server FAIL: ', err, (err && err.stack));
        }
        else {
          console.log(`HTTPS server OK: http://${config.domain}:${config.https.port}`);
        }
      });
  }
  catch (ex) {
    console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
  }
  
  module.exports = app;