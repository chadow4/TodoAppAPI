const db = require("../models");
const Todo = db.todo;
const Category = db.category;

/**
 * CreateTodo Function
 */

createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        });
        const categories = await Category.findAll({
            where: {title: req.body.categories}
        });
        if (categories.length) {
            await todo.setCategories(categories);
            return res.status(200).send({message: "Création d'une nouvelle tâche"});
        }
        return res.status(500).send({message: "Aucune catégories valides"});
    } catch (err) {
        return res.status(500).send({message: "Erreur lors de la création de la tâche"});
    }
};

const todoController = {
    createTodo: createTodo,
};
module.exports = todoController;

