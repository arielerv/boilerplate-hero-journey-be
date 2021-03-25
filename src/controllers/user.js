const {UserService} = require('../services');

class UserController {
    static getSession(req, res, next) {
        try {
            res.send({success: true, user: req.user});
        } catch (err) {
            next(err);
        }
    }

    static async validateSession(req, res, next) {
        try {
            const {user, success} = await UserService.validateToken(req.body.token);
            res.send({success, user});
        } catch (error) {
            next(error);
        }
    }

    static async fetchUsers(req, res, next) {
        try {
            const token = req.get('Authorization');
            const users = await UserService.fetchUsers(req.query, token);
            res.send(users);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
