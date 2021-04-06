require('dotenv').config();
const jwt = require('jsonwebtoken');
const {AUTH_CLIENT_SECRET} = process.env;

const createJWT = user => jwt.sign(user, AUTH_CLIENT_SECRET, {subject: user.email});

module.exports = createJWT;
