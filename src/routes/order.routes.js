const {Router} = require('express');
const {purchaseOrder, getAllOrderByUserId} = require('../controllers/order.controllers');
const authenticate = require('../middlewares/auth.middleware');
const router = Router();

/**
 * @openapi
 * /api/v1/order/{user_id}:
 *   get: 
 *     security: 
 *       - bearerAuth: []
 *     summary: Obtener todas las órdenes de un usuario
 *     tags: [Orders]
 *     parameters: 
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema: 
 *           type: integer
 *           minimum: 1
 *         description: user_id  
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
 *                       $ref: "#components/schemas/Orders"
 * /api/v1/order/{cart_id}:   
 *   post: 
 *     security:
 *       - bearerAuth: []
 *     summary: Comprar el contenido de un carro
 *     tags: [Orders]
 *     requestBody:
 *       description: Se requieren las variables user_id y totalPrice
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: "#components/schemas/purchase"
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
 *                   type: string
 *                   items: 
 *                     type:
 *                       $ref: "#components/schemas/Orders"
 */

router.get('/order/:user_id', authenticate, getAllOrderByUserId);

router.post('/order/:cart_id', authenticate, purchaseOrder);

module.exports = router;