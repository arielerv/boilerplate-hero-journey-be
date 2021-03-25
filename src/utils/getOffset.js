const { PAGE_SIZE } = process.env;
const toNumber = require('lodash/toNumber');

exports.getOffset = page => {
    return (page-1) * toNumber(PAGE_SIZE);
};

exports.getPageSize = () => toNumber(PAGE_SIZE);
