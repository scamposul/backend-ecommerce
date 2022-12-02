const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components: 
 *   schemas: 
 *     Orders:  
 *       type: objects
 *       properties: 
 *         id: 
 *           type: integer
 *           minimum: 1
 *         totalPrice: 
 *           type: string
 *           example: 0
 *         user_id: 
 *           type: integer
 *           example: 1
 *         status: 
 *           type: string
 *           enum: [completed, pending]
 *     purchase:
 *       type: object
 *       properties: 
 *         totalPrice: 
 *           type: string
 *           example: 0
 *         user_id: 
 *           type: integer
 *           example: 1
 *   securitySchemes: 
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT   
 */

const Order = db.define("order", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.STRING
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM("completed", "pending"),
        defaultValue: "completed"
    }
});

module.exports = Order;