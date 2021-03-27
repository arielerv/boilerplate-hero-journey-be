const isEmpty = require('lodash/isEmpty');
const isBoolean = require('lodash/isBoolean');
const filter = require('lodash/filter');
const isNil = require('lodash/isNil');
const get = require('lodash/get');

const validate = (obj, fields) => {
    return filter(fields, fieldName => {
        const field = get(obj, fieldName);
        return isNil(field) || ( isBoolean(field) ? false : isEmpty(field));
    });
};

module.exports = validate;
