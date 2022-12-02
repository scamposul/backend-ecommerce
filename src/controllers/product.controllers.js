const ProductServices = require("../services/products.services");

const getAllProducts = async (req, res, next) => {
  try {
    const result = await ProductServices.getProducts();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
    });
  }
};

const addNewProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const result = await ProductServices.addProduct(newProduct);
    res.status(201).json(result);
  } catch (error) {
    next({
      errorContent: error,
      status: 400,
    });
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const product = req.body;
    const newCart = {
      user_id: product.user_id,
      total_price: "0",
    };
    const result = await ProductServices.addCart(product, cart_id, newCart);
    res.status(201).json(result);
  } catch (error) {
    next({
      errorContent: error,
      status: 400,
    });
  }
};

const getProductsInCart = async (req, res, next) => {
  try {
    const { user_id, cart_id } = req.params;
    const result = await ProductServices.getByUserId(user_id, cart_id);
    res.json(result);
  } catch (error) {
    next({
      errorContent: error,
      status: 400,
    });
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  addToCart,
  getProductsInCart,
};
