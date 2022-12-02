const { Router } = require("express");
const {
  getAllProducts,
  addNewProduct,
  addToCart,
  getProductsInCart,
} = require("../controllers/product.controllers");
const authenticate = require("../middlewares/auth.middleware");
const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get: 
 *     security: 
 *       - bearerAuth: []
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses: 
 *       200: 
 *         description: OK
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 status: 
 *                   type: string
 *                   example: OK
 *                 data: 
 *                   type: array
 *                   items:
 *                     type: 
 *                       $ref: "#components/schemas/Products"
 *   post: 
 *     security: 
 *       - bearerAuth: []
 *     summary: Añadir un producto a la tienda
 *     tags: [Products]
 *     requestBody: 
 *       description: Se requieren las variables name, price, availableQty y user_id. Opcionalmente se puede agregar status e image_url
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             $ref: "#components/schemas/sell"
 *     responses:
 *       200:
 *         description: OK
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: OK
 *                 data: 
 *                   type: array
 *                   items: 
 *                     type: 
 *                       $ref: "#components/schemas/Products"
 * /api/v1/products/{user_id}/{cart_id}:
 *   get: 
 *     security: 
 *       - bearerAuth: []
 *     summary: Obtener los productos en un carrito
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user_id
 *       - in: path 
 *         name: cart_id
 *         required: true
 *         schema: 
 *           type: integer
 *           minimum: 1
 *         description: cart_id
 *         
 *     responses: 
 *       200: 
 *         description: OK
 *         content: 
 *           application/json:
 *             schema:  
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: OK
 *                 data: 
 *                   type: array
 *                   items: 
 *                     type: 
 *                       $ref: "#components/schemas/Products"
 * /api/v1/products/{cart_id}:
 *   post: 
 *     security: 
 *       - bearerAuth: []
 *     summary: Agregar un producto al carrito
 *     tags: [Products]
 *     requestBody: 
 *       description: Se requieren las variables product_id, cart_id, quantity, price, user_id
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#components/schemas/add"
 *     parameters: 
 *       - in: path
 *         name: cart_id
 *         required: true
 *         schema: 
 *           type: integer
 *           minimum: 1
 *         description: cart_id
 *     responses: 
 *       201: 
 *         description: OK
 *         content: 
 *           application/json:
 *             schema: 
 *               type: object
 *               properties: 
 *                 status: 
 *                   type: string
 *                   example: OK
 *                 data: 
 *                   type: array
 *                   items: 
 *                     type: 
 *                       $ref: "#components/schemas/Products" 
 */

router.get("/products", authenticate, getAllProducts);
router.get("/products/:user_id/:cart_id", authenticate, getProductsInCart);
 
router.post("/products", authenticate, addNewProduct);
router.post("/products/:cart_id", authenticate, addToCart);

module.exports = router;
