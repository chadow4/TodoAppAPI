const db = require("../models");
const {authJwt} = require("../middleware");
const User = db.user;
const bcrypt = require("bcryptjs");

/**
 * SignUp Function
 */

signup = async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        return res.send({message: "Inscription réussie"});
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
};

/**
 * SignIn Function
 */

signin = async (req, res) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}});

        if (!user) {
            return res.status(404).send({message: "L'utilisateur n'a pas était trouvé."});
        }

        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Erreur : Mauvais mot de passe!",
            });
        }

        const token = await authJwt.createToken(user);

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token,
        });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};
const authControlller = {
    signup: signup,
    signin: signin,
};
module.exports = authControlller;

