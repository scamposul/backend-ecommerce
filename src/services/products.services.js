const Cart = require("../models/cart.model");
const inCart = require("../models/inCart.model");
const Products = require("../models/products.model");
const Users = require("../models/users.model");

class ProductServices {
    static async getProducts() {
        try {
            const allProducts = await Products.findAll({
                include: {
                    model: Users,
                    attributes: ['username']
                }, 
                attributes: {exclude: ['product_id']}
            });
            const onStock = allProducts.filter((product) => product.availableQty > 0);
            return onStock;
        } catch (error) {
            throw error
        }
    }
    static async addProduct(newProduct) {
        try {
            const result = Products.create(newProduct);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async addCart(product, cart_id, newCart) {
        try {
            const findCart = await Cart.findOne({
                where: {id: cart_id}
            });
            if(findCart) {
                const addProduct = inCart.create(product);
                return addProduct;
            } else {
                const cart = await Cart.create(newCart);
                const addProduct = inCart.create(product);
                return {cart, addProduct};
            }
        } catch (error) {
            throw error;
        }
    }
    static async getByUserId(user_id, cart_id) {
        try {
            const cartContent = await Cart.findAll({
                where: {user_id: user_id},
                attributes: {exclude: ["user_id", "createdAt", "updatedAt"]},
                include: {
                    model: inCart,
                    where: {cart_id: cart_id}
                }
            });
            return cartContent;
        } catch (error) {
            throw error;
        }
    }  
};

module.exports = ProductServices;