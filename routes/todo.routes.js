module.exports = app => {
    const {todoController} = require('../controllers');

    const router = require('express').Router();
    
    router.post('/', todoController.createTodo);

    app.use('/api/todo', router);
};