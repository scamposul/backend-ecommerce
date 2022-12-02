const Users = require("../models/users.model");


class UsersServices {
    static async addUser(newUser) {
        try {
            const result = await Users.create(newUser);
            return result; 
        } catch (error) {
            throw error
        }
    }
};

module.exports = UsersServices;