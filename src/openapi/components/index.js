const schemas = require('./schemas');

//TODO add security schema
module.exports = {
    parameters: {
        State: {
            in: 'query',
            description: 'State',
            name: 'state',
            schema: {type: 'string'},
            required: true
        }
    },
    schemas
};
