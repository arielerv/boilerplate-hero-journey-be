const {UserModel} = require('../models');
const crypto = require('crypto');
const hash = (input, encoding) => crypto.createHash('sha256').update(input).digest(encoding || 'base64');

class AuthService {
    static login(email, password) {
        return UserModel.findOne({
            email: email,
            password: hash(password),
            disabled: {$ne: true}
        }).lean().exec();
    }
}

module.exports = AuthService;
