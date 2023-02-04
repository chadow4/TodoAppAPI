module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", {
        title: {
            type: Sequelize.STRING
        }
    });
    return Category;
};