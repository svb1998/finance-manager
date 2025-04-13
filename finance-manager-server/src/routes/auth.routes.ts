import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();

// Endpoint para registrar un nuevo usuario
router.post("/register", registerUser);

// Endpoint para iniciar sesión
router.post("/login", loginUser);

export default router;
