const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/**
 * @openapi
 * components: 
 *   schemas:
 *     Users: 
 *       type: object
 *       properties: 
 *         id: 
 *           type: integer
 *           example: 1
 *         username: 
 *           type: string
 *           example: anselmo
 *         email: 
 *           type: string
 *           example: anselmo@gmail.com
 *     register: 
 *       type: object
 *       properties: 
 *         username: 
 *           type: string
 *           example: nemesio
 *         email: 
 *           type: string
 *           example: nemesio@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     login: 
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *           example: anselmo
 *         password: 
 *           type: string
 *           example: 1234
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  
 */

const Users = db.define(
  "users",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const { password } = user;
        const hash = bcrypt.hashSync(password, 8);
        user.password = hash;
      },
    },
  }
);

module.exports = Users;
