import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import authRouter from "./auth/auth.routes";
import groupsRouter from "./groups/groups.routes";
import transactionsRouter from "./transactions/transactions.routes";
import categoriesRouter from "./categories/categories.routes";

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

router.use("/transactions", transactionsRouter);

router.use("/categories", categoriesRouter);

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
