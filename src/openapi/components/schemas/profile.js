module.exports = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            nullable: true
        },
        success: {
            type: 'boolean',
            nullable: true
        },
        user: {
            allOf: [{$ref: '#/components/schemas/User'}],
            type: 'object',
            required: [
                'roles'
            ],
            properties: {
                role: {
                    type: 'array',
                    items: {type: 'string'}
                },
                attributes: {type: 'object'}
            }
        }
    }
};
