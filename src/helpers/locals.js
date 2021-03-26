const dotenv = require('dotenv');
const packageJson = require('../../package.json');
dotenv.config();

class Locals {
    static config() {
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || packageJson.port || 9999;
        const DATABASE_URL = process.env.DATABASE_URL;
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
        const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';
        const name = packageJson.name || 'Journey';
        const year = (new Date()).getFullYear();
        const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
        const description = process.env.APP_DESCRIPTION || 'Here goes the app description';
        const NODE_ENV = process.env.NODE_ENV || 'production';
        const DB_DRIVER = process.env.DB_DRIVER;
        const DB_CONFIG = process.env.DB_CONFIG;
        const apiPrefix = process.env.API_PREFIX || 'api';
        const logDays = process.env.LOG_DAYS || 10;

        return {
            apiPrefix,
            copyright,
            DB_DRIVER,
            DB_CONFIG,
            description,
            logDays,
            maxUploadLimit,
            maxParameterLimit,
            DATABASE_URL,
            name,
            port,
            url,
            NODE_ENV
        };
    }
}

module.exports = Locals;
