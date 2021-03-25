const { UserController } = require('../../controllers');

module.exports = router => {
    router.get('/', UserController.fetchUsers);
    router.get('/', UserController.getSession);

    return router;
};
