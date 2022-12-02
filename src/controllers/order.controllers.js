const OrderServices = require("../services/order.services");

const getAllOrderByUserId = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        const result = await OrderServices.getByUser(user_id);
        res.json(result);
    } catch (error) {
        next({
            errorContent: error,
            status: 400
        });   
    }
};

const purchaseOrder = async (req, res, next) => {
    try {
        const {cart_id} = req.params;
        const order = req.body;
        const result = await OrderServices.purchase(cart_id, order);
        res.status(201).json(result);
    } catch (error) {
        next({
            errorContent: error,
            status: 400
        });
    }
};

module.exports = {purchaseOrder, getAllOrderByUserId};