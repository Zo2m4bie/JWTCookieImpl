var { find } = require('lodash');

const users = [
    {
        id: '1',
        email: 'email@gmail.com',
        password: '12345678',
    },
    {
        id: '2',
        email: 'email2@gmail.com',
        password: '12345678',
    }
];

async function findUser(email) {
    return find(users, { email });
}

module.exports = { findUser };