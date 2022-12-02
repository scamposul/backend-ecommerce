const UsersServices = require("../services/users.services");
const transporter = require("../utils/mailer");
const welcomeTemplate = require("../templates/welcome");

const register = async (req, res, next) => {
    try {
        const newUser = req.body;
        const result = await UsersServices.addUser(newUser);
        transporter.sendMail({
            from: "<camposebastian69@gmail.com>",
            to: result.email,
            subject: "Se ha registrado en El Charco de la Pava",
            text: "Bienvenido al Charco de la Pava",
            html: welcomeTemplate(result.username)
        });
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error
        })
    }
};

module.exports = {register};