const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const inCart = db.define("in_cart", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  cart_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  product_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM("purchased", "pending"),
    defaultValue: "pending",
  },
});

module.exports = inCart;
