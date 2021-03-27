const fetch = require('node-fetch');
const {stringify} = require('querystring');
const {User} = require('../models');
const {ObjectId} = require('mongoose').Types;

const {AUTH_ENDPOINT, AUTH_CLIENT_ID, AUTH} = process.env;
const OAUTH_API = `${AUTH_ENDPOINT}oauth/`;

class UserService {
    static async validateToken(bearerToken) {
        try {
            // eslint-disable-next-line
            const token = bearerToken.replace('Bearer ', '');
            const response = await fetch(
                `${OAUTH_API}token`,
                {
                    method: 'post',
                    body: JSON.stringify({
                        token,
                        grant_type: 'client_credentials'
                    }),
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        clientId: AUTH_CLIENT_ID
                    }
                }
            );
            return response.json();
        } catch (err) {
            throw Error(err);
        }
    }

    static async fetchUsers(token, route, filters) {
        try {
            const routeWithFilters = filters ? `${route}?${stringify(filters)}` : route;
            const arqResponse = await fetch(
                `${OAUTH_API}${routeWithFilters}`,
                {
                    method: 'get',
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        Authorization: token,
                        clientId: AUTH_CLIENT_ID,
                        redirectUri: AUTH
                    }
                }
            );
            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }
    }

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
