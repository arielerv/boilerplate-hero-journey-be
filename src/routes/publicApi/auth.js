const { AuthController } = require('../../controllers');

module.exports = router => {
    router.post('/login', AuthController.login);
    router.post('/session', AuthController.validateSession);

    return router;
};
