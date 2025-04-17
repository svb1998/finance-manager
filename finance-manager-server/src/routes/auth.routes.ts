import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/user.controller";

const router = Router();

// Endpoint para registrar un nuevo usuario
router.post("/auth/register", registerUser);

// Endpoint para iniciar sesión
router.post("/auth/login", loginUser);

router.get("/profile", authenticateToken, getUser);

export default router;
