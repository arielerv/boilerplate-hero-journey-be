const {User} = require('../models');
const {ObjectId} = require('mongoose').Types;

class UserService {
    static updateById(userId, user) {
        return User.updateOne({_id: ObjectId(userId)}, user).exec();
    }

    static find(filters) {
        return User.findOne(filters, {password: 0}).lean().exec();
    }

    static async create(user) {
        const userSaved = await new User(user).save();
        return this.find({ _id: userSaved._id});
    }
}

module.exports = UserService;
