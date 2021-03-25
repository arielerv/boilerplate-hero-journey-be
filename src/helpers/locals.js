const dotenv = require('dotenv');
const packageJson = require('../../package.json');
dotenv.config();

class Locals {
    static config() {
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || packageJson.port || 9999;
        const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
        const DATABASE_URL = process.env.DATABASE_URL;
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
        const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';
        const name = packageJson.name || 'NodeTS Dashboard';
        const keywords = process.env.APP_KEYWORDS || 'somethings';
        const year = (new Date()).getFullYear();
        const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
        const company = process.env.COMPANY_NAME || 'GeekyAnts';
        const description = process.env.APP_DESCRIPTION || 'Here goes the app description';
        const NODE_ENV = process.env.NODE_ENV || 'production';
        const DB_DRIVER = process.env.DB_DRIVER;
        const DB_CONFIG = process.env.DB_CONFIG;
        const isCORSEnabled = process.env.CORS_ENABLED || true;
        const apiPrefix = process.env.API_PREFIX || 'api';
        const logDays = process.env.LOG_DAYS || 10;
        const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
        const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

        /*
        const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379;
		const redisHttpHost = process.env.REDIS_QUEUE_HOST || '127.0.0.1';
		const redisPrefix = process.env.REDIS_QUEUE_DB || 'q';
		const redisDB = process.env.REDIS_QUEUE_PREFIX || 3;
        */
        return {
            appSecret,
            apiPrefix,
            company,
            copyright,
            DB_DRIVER,
            DB_CONFIG,
            description,
            isCORSEnabled,
            keywords,
            logDays,
            maxUploadLimit,
            maxParameterLimit,
            DATABASE_URL,
            name,
            port,
            url,
            queueMonitor,
            queueMonitorHttpPort,
            NODE_ENV
        };
    }
}

module.exports = Locals;
