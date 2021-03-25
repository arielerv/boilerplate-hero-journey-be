const bunyan = require('bunyan');

exports.loggerInstance = bunyan.createLogger({
    name: 'transaction-notifier',
    serializers: {
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    level: 'info'
});

exports.logResponse = function (id, body, statusCode) {
    const log = this.loggerInstance.child({
        id: id,
        body: body,
        statusCode: statusCode
    }, true);
    log.info('response');
};
