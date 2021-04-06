const express = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const logger = require('./helpers/logger');
const Router = require('./routes');
const packageJson = require('../package.json');
const {OpenApiValidator} = require('express-openapi-validator');
const Mongoose = require('./helpers/mongoose');
const {BODY_LIMIT, NODE_ENV, PORT} = process.env;
const sixtyDaysInSeconds = 15768000;

class App {
    constructor() {
        this.app = express;
    }

    test() {
        express.use(bodyParser.json({limit: BODY_LIMIT}));
        express.use(bodyParser.urlencoded({extended: true}));
        this._routes();
        return express;
    }

    _onListening() {
        if(NODE_ENV !== 'test') {
            logger.info(`Started ${packageJson.name} at port ${PORT} in ${NODE_ENV} environment`);
        }
    }

    _onError(err) {
        logger.error(`App Crashed, Error: ${err.errorMessage}`);
        process.exit;
    }

    async init() {
        await this._configure();
        express.listen(PORT, this._onListening);
        express.on('error', this._onError);
        return express;
    }

    _configure() {
        Mongoose.configure();
        this._middlewares();
        return this._routes();
    }

    _middlewares() {
        express.use(bodyParser.json({limit: BODY_LIMIT}));
        express.use(bodyParser.urlencoded({extended: true}));
        express.use(cookieParser());
        if (NODE_ENV !== 'test') {
            express.use(function (req, res, next){
                logger.info(`${req.method} ${req.url} ${res.statusCode}`);
                next();
            });
        }
        if (NODE_ENV === 'development') {
            express.use(cors({
                credentials: true,
                origin: /^http:\/\/localhost/
            }));
        } else if(NODE_ENV !== 'test') {
            express.disable('x-powered-by');
            express.use(
                helmet({
                    referrerPolicy: { policy: 'no-referrer' },
                    contentSecurityPolicy: false,
                    hsts: {maxAge: sixtyDaysInSeconds}
                })
            );
            express.use(cors());
        }
    }

    async _routes() {
        const apiSpec = require('./openapi');
        const options = {swaggerOptions: {validatorUrl: null}};

        express.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec, options));
        //TODO validate requests in true
        await new OpenApiValidator({
            apiSpec,
            validateRequests: false,
            validateResponses: false
        }).install(express);
        Router.configure(express);
    }
}

module.exports = App;
