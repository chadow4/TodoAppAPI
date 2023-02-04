const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.todo = require("../models/todo.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);

/* Many To Many CategoryModel & TodoModel */

db.todo.belongsToMany(db.category, {
    through: "category_todos",
    foreignKey: "todoId",
    otherKey: "categoryId"
});

db.category.belongsToMany(db.todo, {
    through: "category_todos",
    foreignKey: "categoryId",
    otherKey: "todoId"
});


/* One To Many TodoModel & UserModel  */

db.user.hasMany(db.todo, {foreignKey: 'userId'});
db.todo.belongsTo(db.user,
    {
        foreignKey: 'userId'
    });


module.exports = db;