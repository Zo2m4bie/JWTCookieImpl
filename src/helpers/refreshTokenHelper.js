const jwt = require('jsonwebtoken');

const REFRESH_TOKEN_SECRET = "refresh_token_secret";

function createRefreshToken(userId) {
    const hrTime = process.hrtime();
    const timeInMillisecond = hrTime[0] * 1000000 + hrTime[1] / 1000;
    return jwt.sign({ id: userId, createDate: timeInMillisecond }, REFRESH_TOKEN_SECRET);
}

module.exports = { REFRESH_TOKEN_SECRET, createRefreshToken };