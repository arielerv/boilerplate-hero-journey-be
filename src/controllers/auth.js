const filter = require('lodash/filter');
const isNil = require('lodash/isNil');
const get = require('lodash/get');
const omit = require('lodash/omit');
const isEmpty = require('lodash/isEmpty');
const {AuthService} = require('../services');
const jwt = require('jsonwebtoken');
const {AUTH_CLIENT_SECRET} = process.env;
const createJWT = user => jwt.sign(user, AUTH_CLIENT_SECRET, {subject: user.email});
const validateJWT = token => jwt.verify(token, AUTH_CLIENT_SECRET);
const validate = (obj, fields) => filter(fields, fieldName => isNil(get(obj, fieldName)) ||
    isEmpty(get(obj, fieldName)));

class AuthController {
    static async login(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email', 'password']);
            if(missingFields.length) {
                res.status(400).send({success: false, missingFields});
            }
            const user = await AuthService.login(req.body.email, req.body.password);
            if (!user) {
                return res.status(401).send('Invalid username and/or password');
            }
            req.user = user;
            req.session = {authorized: true};
            res.send({success: true, user, token: createJWT(user), profile: req.user});
        } catch (err) {
            next(err);
        }
    }

    static async validateSession(req, res, next) {
        try {
            const missingFields = validate(req.body, ['token']);
            if(missingFields.length) {
                res.status(400).send({success: false, missingFields});
            }
            const validProfile = await validateJWT(req.body.token);
            req.user = omit(validProfile, ['_id', 'iat', 'sub', 'password']);
            if (!validProfile) {
                return res.status(401).send('Invalid token.');
            }
            res.send({success: true, token: req.body.token, profile: req.user});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
