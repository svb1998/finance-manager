import { Router } from "express";
import { AuthController } from "../interfaces/controllers/auth/auth.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/user.controller";
import { createGroup, getGroups } from "../controllers/groups.controller";
import { AuthService } from "../application/auth/services/AuthService";
import { SupabaseAuthRepository } from "../infrastructure/auth/SupabaseAuthRepository";

const router = Router();

//:TODO: Implement containers when it grows in the future
const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// **** TEST ****
router.get("/", (req, res) => {
    res.send("Finance Manage API");
});

// **** Auth ****
router.post("/auth/authenticate", authenticateToken);

// Endpoint para registrar un nuevo usuario
router.post("/auth/register", authController.registerUser);

// Endpoint para iniciar sesión
router.post("/auth/login", authController.loginUser);

// **** Profiles ****
router.get("/profile", authenticateToken, getUser);

// **** Groups ****

router.get("/groups", authenticateToken, getGroups);

router.post("/groups/create", authenticateToken, createGroup);

export default router;
