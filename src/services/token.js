const querystring = require('querystring');
const {User} = require('../models');
const CryptoService = require('../services/crypto');
const {messageErrors} = require('../constants');

const TOKEN_TTL = 30 * 60 * 1000;

class TokenService {
    static async validateToken(token, tokenType) {
        const data = JSON.parse(CryptoService.decrypt(querystring.unescape(token)));
        const timestamp = new Date(data.timestamp);
        if (data.type !== tokenType || !data.timestamp || !timestamp.getTime()) {
            return {error: messageErrors.TOKEN_EXPIRED};
        }
        if (new Date() - timestamp > TOKEN_TTL) {
            return {error: messageErrors.TOKEN_EXPIRED};
        }
        return {user: await User.findOne({email: data.user}, {password: 0}).lean().exec()};
    }

    static async reset(token, password, tokenType) {
        const user = await TokenService.validateToken(token, tokenType);
        user.password = CryptoService.hash(password);
        return user.save();
    }
}

module.exports = TokenService;
