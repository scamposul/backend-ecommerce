const { Router } = require("express");
const { register } = require("../controllers/users.controllers");
const router = Router();

/**
 * @openapi
 *   /api/v1/users:
 *     post: 
 *       summary: Se registra un nuevo usuario a la aplicación
 *       tags: [Users]
 *       requestBody: 
 *         description: Se requieren las siguientes variables username, email, password
 *         required: true
 *         content: 
 *           application/json:
 *             schema: 
 *               $ref: "#components/schemas/register"
 *       responses:
 *         201:
 *           description: Created
 *           content: 
 *             application/json:
 *               schema: 
 *                 type: object
 *                 properties: 
 *                   status: 
 *                     type: string
 *                     example: OK
 *                   data:
 *                     type: array
 *                     items: 
 *                       type: 
 *                         $ref: "#components/schemas/Users"  
 */

router.post('/users', register);

module.exports = router;