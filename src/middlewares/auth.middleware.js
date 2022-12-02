const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticate = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(bearerToken) {
        const token = bearerToken.replace("Bearer ", "");
        console.log(token);
        try {
            const decoded = jwt.verify(token, "1234", {
                algorithm: 'HS512',
                ignoreExpiration: true
            });
            next();
        } catch (error) {
            next({
                message: "Invalid token",
                status: 400,
                errorContent: error
            });
        }
    } else {
        res.status(400).json("Invalid token")
    }
};

module.exports = authenticate;