const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components: 
 *   schemas: 
 *     Products: 
 *       type: objects
 *       properties: 
 *         id: 
 *           type: integer
 *           minimum: 1
 *         name: 
 *           type: string
 *           example: Silo en bulto X 25 kg
 *         price: 
 *           type: string
 *           example: 5.00
 *         availableQty: 
 *           type: integer
 *           example: 1
 *         status:
 *           type: string
 *           enum: [on stock, out of stock]
 *         image_url: 
 *           type: string
 *           example: https://cutt.ly/M1pocwP
 *         user_id: 
 *           type: integer
 *           example: 1
 *     sell:
 *       type: object
 *       properties: 
 *         name: 
 *           type: string
 *           example: Silo en bulto X 25 kg
 *         price: 
 *           type: string
 *           example: 5.00
 *         availableQty: 
 *           type: integer
 *           example: 1
 *         user_id: 
 *           type: integer
 *           example: 1
 *     add: 
 *       type: object
 *       properties:
 *         product_id: 
 *           type: integer
 *           example: 1
 *         cart_id: 
 *           type: integer
 *           example: 1
 *         quantity: 
 *           type: integer
 *           example: 1
 *         price: 
 *           type: string
 *           example: 5.00
 *   securitySchemes: 
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    
 */

const Products = db.define("products", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  price: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  availableQty: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM("on stock", "out of stock"),
    defaultValue: "on stock",
  },
  image_url: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Products;
