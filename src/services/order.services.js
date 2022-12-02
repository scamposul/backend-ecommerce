const inCart = require("../models/inCart.model");
const inOrder = require("../models/inOrder.model");
const Order = require("../models/order.model");

class OrderServices {
  static async getByUser(user_id) {
    try {
        const result = await Order.findAll({
            where: {user_id: user_id}
        });
        return result;
    } catch (error) {
        
    }
  }  
  static async purchase(cart_id, order) {
    try {
      const findProducts = await inCart.findAll({
        where: { cart_id: cart_id },
      });
      const createOrder = await Order.create(order);
      const purchaseProducts = findProducts.forEach((product) =>
        inOrder.create({
          order_id: createOrder.id,
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
          status: "purchased",
        }), inCart.update({status: 'purchased'}, { where: {id: cart_id}}) 
      );
      return {createOrder, purchaseProducts};
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderServices;
