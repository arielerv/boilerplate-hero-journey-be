const jwt = require('jsonwebtoken');
const {AUTH_CLIENT_SECRET} = process.env;

const validateJWT = token => jwt.verify(token, AUTH_CLIENT_SECRET);

module.exports = validateJWT;
