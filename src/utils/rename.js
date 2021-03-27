const includes = require('lodash/includes');
const keys = require('lodash/keys');
const clone = require('lodash/clone');

const rename = (obj, key, newKey) => {
    if(includes(keys(obj), key)) {
        obj[newKey] = clone(obj[key]);
        delete obj[key];
    }
    return obj;
};

module.exports = rename;
