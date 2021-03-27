const {model, Schema} = require('mongoose');

const modelSchema = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    surname: {type: String, required: true},
    confirmed: {type: Boolean},
    password: {type: String},
    disabled: {type: Boolean}
};

const customSchema = new Schema(modelSchema, {collection: 'users', timestamps: true});
const customModel = model('User', customSchema);

module.exports = customModel;
