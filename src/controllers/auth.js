const omit = require('lodash/omit');
const {AuthService, UserService, EmailService, TokenService} = require('../services');
const {CryptoService} = require('../services');
const {validate, validateJWT, createJWT} = require('../utils');
const {TOKEN_TYPE_REGISTER, TOKEN_TYPE_RECOVERY, messageErrors, EMAIL} = require('../constants');
const {TYPE_CONFIRM} = process.env;

class AuthController {
    static async login(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email', 'password']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: messageErrors.CHECK_DATA});
            }
            const user = await AuthService.login(req.body.email, req.body.password);
            if (!user) {
                return res.status(401).send({message: messageErrors.INVALID_USER});
            }
            if(!user.confirmed) {
                return res.status(401).send({message: messageErrors.EMAIL_NOT_CONFIRMED});
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
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const validProfile = await validateJWT(req.body.token);
            req.user = omit(validProfile, ['iat', 'sub', 'password']);
            if (!validProfile) {
                return res.status(401).send({message: messageErrors.INVALID_TOKEN});
            }
            res.send({success: true, token: req.body.token, profile: req.user});
        } catch (err) {
            next(err);
        }
    }

    static async register(req, res, next) {
        try {
            const missingFields = validate(req.body, ['name', 'surname', 'email', 'password', 'terms']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: messageErrors.CHECK_DATA});
            }
            const token = CryptoService.encrypt(JSON.stringify({
                type: TOKEN_TYPE_REGISTER,
                user: req.body.email,
                timestamp: Date.now()
            }));
            const user = await UserService.find({email: req.body.email});
            if (user) {
                return res.status(400).send({ emailExists: true, message: messageErrors.EMAIL_ALREADY_EXIST});
            }
            const userSaved = await UserService.create({
                ...req.body,
                password: CryptoService.hash(req.body.password),
                confirmed: TYPE_CONFIRM !== EMAIL
            });
            if(TYPE_CONFIRM !== EMAIL) {
                return res.send({success: true});
            }
            console.log('paso1');
            const response = await EmailService.sendMail(
                req.body.email,
                'User register for Hero\'s Journey',
                `<p>Hi! ${userSaved.name},</p><p>We welcome you to the app <strong>Hero's Journey</strong>.</p></br><p><a href="http://localhost:5050/register/validate?token=${token}" target="_blank" rel="noopener noreferrer">Click here</a> to finish the registration.</p></br>`
            );
            console.log({response});
            if (response.error) {
                return res.status(500).send({success: false, message: messageErrors.ERROR_SEND_EMAIL});
            }
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async confirmEmail(req, res, next) {
        try {
            const missingFields = validate(req.body, ['token']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: messageErrors.CHECK_DATA});
            }
            const {user, error} = await TokenService.validateToken(req.body.token, TOKEN_TYPE_REGISTER);
            if (error || !user) {
                return res.status(400).send({success: false, message: error || messageErrors.GENERAL_ERROR});
            }
            if (user.confirmed) {
                return res.status(400).send({success: false, message: messageErrors.EMAIL_ALREADY_CONFIRM});
            } else {
                await UserService.updateById(user._id, {...user, confirmed: true});
            }
            req.user = user;
            req.session = {authorized: true};
            res.send({success: true, profile: user, token: createJWT(user)});
        } catch (err) {
            next(err);
        }
    }

    static async verifyEmail(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: messageErrors.CHECK_DATA});
            }
            const user = await UserService.find({email: req.body.email});
            if (user) {
                return res.status(400).send({ emailExists: true, message: messageErrors.EMAIL_ALREADY_EXIST});
            }
            res.send({ emailExists: false});
        } catch (err) {
            next(err);
        }
    }

    static async recoveryPassword(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: messageErrors.CHECK_DATA});
            }
            const user = await UserService.find({email: req.body.email});
            if (!user) {
                return res.status(400).send({ success: false, message: messageErrors.CHECK_DATA});
            }
            const token = CryptoService.encrypt(JSON.stringify({
                type: TOKEN_TYPE_RECOVERY,
                user: req.body.email,
                timestamp: Date.now()
            }));
            const response = await EmailService.sendMail(
                user.email,
                'User recovery password for Hero\'s Journey',
                `<p>Hi! ${user.name},</p><p>To enter the app, you must create a new password by clicking on this <strong>Hero's Journey</strong>.</p></br><p><a href="http://localhost:5050/resetPassword?token=${token}&email=${user.email}" target="_blank" rel="noopener noreferrer">Link</a>.</p></br>`
            );
            if (response.error) {
                return res.status(500).send({success: false, message: messageErrors.ERROR_SEND_EMAIL});
            }
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email', 'token', 'password']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: messageErrors.CHECK_DATA});
            }
            const {user, error} = await TokenService.validateToken(req.body.token, TOKEN_TYPE_RECOVERY);
            if(error) {
                return res.status(400).send({ success: false, error});
            }
            if(!user) {
                return res.status(400).send({ success: false, message: messageErrors.CHECK_DATA});
            }
            await UserService.updateById(user._id, {
                ...user,
                password: CryptoService.hash(req.body.password)
            });
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

}

module.exports = AuthController;
