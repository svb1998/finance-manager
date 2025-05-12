import { Router } from "express";
import { AuthController } from "../interfaces/controllers/auth/auth.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/user.controller";
import { createGroup, getGroups } from "../controllers/groups.controller";
import { AuthService } from "../application/auth/services/auth.service";
import { SupabaseAuthRepository } from "../infrastructure/auth/SupabaseAuthRepository";
import authRouter from "./auth/auth.routes";
import groupsRouter from "./groups/groups.routes";

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Test endpoint
 *     tags:
 *       - Test
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno del servidor

 *
 */
router.get("/", (req, res) => {
    res.send("Finance Manage API");
});

router.use("/auth", authRouter);

router.use("/groups", groupsRouter);

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/profile", authenticateToken, getUser);

export default router;
