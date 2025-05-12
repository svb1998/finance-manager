import { Router } from "express";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { SupabaseAuthRepository } from "../../infrastructure/auth/SupabaseAuthRepository";
import { AuthService } from "../../application/auth/services/auth.service";
import { AuthController } from "../../interfaces/controllers/auth/auth.controller";

const authRouter = Router();

const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

//TODO: Acabar de implementar con el frontend
// /**
//  * @openapi
//  * /auth/register:
//  *   post:
//  *     summary: Registro de un nuevo usuario

//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *     responses:
//  *       200:
//  *         description: Registro exitoso
//  *       400:
//  *         description: Datos de registro inválidos
//  *       500:
//  *         description: Error interno del servidor
//  */
authRouter.post("/register", authController.registerUser);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Inicio de sesión de un usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Datos de inicio de sesión inválidos
 *       500:
 *         description: Error interno del servidor
 */

authRouter.post("/login", authController.loginUser);

export default authRouter;
