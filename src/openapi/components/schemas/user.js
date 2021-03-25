module.exports = {
    type: 'object',
    properties: {
        id: {
            description: 'id of user',
            type: 'string',
            format: 'uuid'
        },
        username: {
            description: 'Username.',
            type: 'string'
        },
        name: {
            description: 'Name.',
            type: 'string'
        },
        surname: {
            description: 'Surname.',
            type: 'string'
        },
        documentId: {
            description: 'Document or CUIT.',
            type: 'string'
        },
        email: {
            description: 'Email.',
            type: 'string',
            format: 'email'
        },
        deleted: {
            type: 'boolean',
            default: false,
            description: 'If the user its deleted from the current APP'
        }
    },
    required: ['name', 'surname', 'documentId', 'email']
};
