const { Router } = require("express");
const userLogin = require("../controllers/auth.controllers");
const router = Router();

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión en la aplicación
 *     tags: [Login]
 *     requestBody:
 *       description: Se requieren las variables email y password
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: "#components/schemas/login"
 *     responses:
 *       201: 
 *         description: Logged in
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
 *                       $ref: "#components/schemas/Users"
 *                       
 */

router.post("/login", userLogin);

module.exports = router;