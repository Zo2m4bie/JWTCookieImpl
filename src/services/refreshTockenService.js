var { find, reject } = require('lodash');

const refreshTockensStorage = [];

function addRefreshToken(refreshToken, userId){
    refreshTockensStorage.push({refreshToken, userId});
    console.log(refreshTockensStorage);
}

function findRefreshToken(refreshToken) {
    console.log('Find');
    console.log(refreshTockensStorage);
    console.log(refreshToken);
    find(refreshTockensStorage, { refreshToken });
}

function removeRefreshToken(refreshToken) {
    reject(refreshTockensStorage, { refreshToken });
}

module.exports = { addRefreshToken, findRefreshToken, removeRefreshToken };