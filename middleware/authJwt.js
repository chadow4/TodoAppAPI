const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

/**
 * VerifyToken Function
 */

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "Le token n'est pas valide"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Vous n'avez pas les permissions d'accéder à cette page"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

/**
 * CreateToken Function
 */

createToken = (user) => {
    try {
        // return token with payload, secretkey and expireDate
        return jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}


const authJwt = {
    verifyToken: verifyToken,
    createToken: createToken,
};
module.exports = authJwt;