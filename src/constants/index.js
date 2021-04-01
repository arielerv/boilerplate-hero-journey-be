const messageErrors = require('./messageErrors');
const TOKEN_TYPE_REGISTER = 'register';
const TOKEN_TYPE_RECOVERY = 'recovery';
const TOKEN_TTL = 30 * 60 * 1000;
const EMAIL = 'email';

module.exports = {TOKEN_TYPE_REGISTER, TOKEN_TYPE_RECOVERY, TOKEN_TTL, messageErrors, EMAIL};
