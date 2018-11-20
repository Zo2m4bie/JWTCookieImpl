const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const { REFRESH_TOKEN_SECRET, createRefreshToken } = require('../../helpers/refreshTokenHelper');

const router = new Router();
const WEEK_IN_MILLISECONDS = 604800000;

router.post('/', bodyParser(), async ctx => {
    const refreshToken = ctx.cookies.get('refreshToken');
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded);
        if(!decoded || !isValidRefreshToken(decoded.createDate)){
            const error = new Error();
            error.status = 404;
            throw error;
        }
        const newRefreshToken = createRefreshToken(decoded.id);
        ctx.cookies.set('refreshToken', newRefreshToken, {httpOnly: true});
        ctx.body = {
            token: jwt.sign({ id: decoded.id }, SECRET),
            refreshToken: newRefreshToken,
          };

    });

});

function isValidRefreshToken(createDate) {
    const hrTime = process.hrtime();
    const timeInMillisecond = hrTime[0] * 1000000 + hrTime[1] / 1000;
    const diff = timeInMillisecond - createDate;
    console.log(diff);
    return diff > 0 && diff < WEEK_IN_MILLISECONDS
}

module.exports = router;