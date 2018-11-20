const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const userService = require('../../services/user');
const { createRefreshToken } = require('../../helpers/refreshTokenHelper');

const router = new Router();

router.post('/login', bodyParser(), async ctx => {
    const {email, password} = ctx.request.body;
    const user = await userService.findUser(email);
    if (!user) {
        const error = new Error();
        error.status = 403;
        throw error;
    }

    const newRefreshToken = createRefreshToken(user.id);
    ctx.cookies.set('refreshToken', newRefreshToken, {httpOnly: true});
    ctx.body = {
        token: jwt.sign({ id: user.id }, SECRET),
      };

});

module.exports = router;