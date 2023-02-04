module.exports = app => {
    const {userController} = require('../controllers');

    const router = require('express').Router();

    router.get('/:userId', userController.getUserInformation);

    app.use('/api/user', router);
};