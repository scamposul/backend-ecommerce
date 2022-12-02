const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Cart = db.define("cart", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    total_price: {
        allowNull: false,
        type: DataTypes.STRING
    }
});

module.exports = Cart;