const Koa = require('koa');
var Router = require('koa-router');
const userModule = require('./src/modules/login/login');
const refreshModule = require('./src/modules/refresh/refresh');

const app = new Koa();
var router = new Router();
 
router.use('/auth', userModule.routes());
router.use('/refresh', refreshModule.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);