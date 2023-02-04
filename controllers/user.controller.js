const db = require("../models");
const User = db.user;
const Todo = db.todo;
const Category = db.category;

/**
 * getUserInformation Function
 */

getUserInformation = async (req, res) => {
    try {
        console.log(req.params.userId);
        const user = await User.findOne({
            where: {id: req.params.userId},
            attributes: ['username', 'email'],
            include: [{
                model: Todo,
                attributes: ['title', 'description', 'finished'],
                include: [{
                    model: Category,
                    attributes: ['title'],
                }]
            }]
        });
        return res.send(user);
    } catch (err) {
        return res.status(500).send({message: "Impossible de charger les informations de l'utilisateur."});
    }
};

const userController = {
    getUserInformation: getUserInformation,
};
module.exports = userController;


