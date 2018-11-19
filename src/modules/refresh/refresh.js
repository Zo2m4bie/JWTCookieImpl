const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const { SECRET } = require('../../config');
const { addRefreshToken, findRefreshToken, removeRefreshToken } = require('../../services/refreshTockenService');

const router = new Router();

router.post('/', bodyParser(), async ctx => {
    const { token } = ctx.request.body;
    const refreshToken = ctx.cookies.get('refreshToken');
    const entity = findRefreshToken(refreshToken);
    if(!entity) {
        const error = new Error();
        error.status = 404;
        throw error;
    }

    removeRefreshToken(refreshToken);
    const newRefreshToken = uuid();
    addRefreshToken(newRefreshToken, user.id);
    ctx.cookies.set('refreshToken', newRefreshToken, {httpOnly: true});
    ctx.body = {
        token: jwt.sign({ id: userId }, SECRET),
        refreshToken: newRefreshToken,
      };

});

module.exports = router;