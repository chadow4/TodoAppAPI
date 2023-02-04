const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const usernameUser = await User.findOne({ where: { username: req.body.username } });
        if (usernameUser) {
            return res.status(400).send({ message: "Erreur : Le pseudo est déjà utilisé" });
        }

        const emailUser = await User.findOne({ where: { email: req.body.email } });
        if (emailUser) {
            return res.status(400).send({ message: "Erreur : l'email est déjà utilisé!" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;