const {model, Schema, Types} = require('mongoose');

const modelSchema = {
    _id: {type: Types.ObjectId},
    name: {type: String, required: true},
    email: {type: String, required: true},
    surname: {type: String, required: true}
};

const customSchema = new Schema(modelSchema, {collection: 'users', timestamps: true});
const customModel = model('User', customSchema);

module.exports = customModel;
