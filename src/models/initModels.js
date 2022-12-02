const Cart = require("./cart.model");
const inCart = require("./inCart.model");
const inOrder = require("./inOrder.model");
const Order = require("./order.model");
const Products = require("./products.model");
const Users = require("./users.model");

const initModels = () => {
  Users.hasMany(Products, { foreignKey: "user_id" });
  Products.belongsTo(Users, { foreignKey: "user_id" });

  Users.hasOne(Cart, { foreignKey: "user_id" });
  Cart.belongsTo(Users, { foreignKey: "user_id" });

  Users.hasMany(Order, { foreignKey: "user_id" });
  Order.belongsTo(Users, { foreignKey: "user_id" });

  inCart.hasOne(Products, { foreignKey: "product_id" });
  Products.belongsTo(inCart, { foreignKey: "product_id" });

  Cart.hasMany(inCart, { foreignKey: "cart_id" });
  inCart.belongsTo(Cart, { foreignKey: "cart_id" });

  inOrder.hasOne(Products, { foreignKey: "product_id" });
  inOrder.belongsTo(Order, { foreignKey: "order_id" });
};


module.exports = initModels;