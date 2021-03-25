module.exports = {
    '/api/user/session': {
        get: {
            operationId: 'session',
            description: 'Return current session',
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Profile'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
