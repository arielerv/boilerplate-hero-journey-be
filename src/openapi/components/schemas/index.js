const Error = require('./error');
const Files = require('./files');
const Success = require('./success');
const User = require('./user');
const ValidateToken = require('./validateToken');
const Profile = require('./profile');

module.exports = {
    ArrayString: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'string'}
    },
    ArrayNumber: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'integer'}
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'string', format: 'uuid'}
    },
    ProfileUser: {
        allOf: [{$ref: '#/components/schemas/User'}],
        type: 'object',
        required: ['roles'],
        properties: {
            role: {
                type: 'array',
                items: {type: 'string'}
            },
            attributes: {type: 'object'}
        }
    },
    Error,
    Files,
    Success,
    User,
    Profile,
    ValidateToken
};
