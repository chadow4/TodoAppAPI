module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("Todo", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        finished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Todo;
};