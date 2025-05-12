import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../../../config/supabaseClient";
import jwt from "jsonwebtoken";
import { AuthService } from "../../../application/auth/services/auth.service";
import { RegisterDto } from "../../../application/auth/dto/Register.dto";
import { LoginDto } from "../../../application/auth/dto/Login.dto";

export class AuthController {
    constructor(public readonly authService: AuthService) {}

    // Función para registrar un nuevo usuario
    registerUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const dto: RegisterDto = {
                email: email,
                password: password,
            };

            const result = await this.authService.registerUser(dto);

            res.status(201).json(result);
            return;
        } catch (err) {
            //TODO: Manejar errores de forma adecuada
            res.status(500).json({
                error: "Error al registrar usuario",
                details: err,
            });
            return;
        }
    };

    // Función para iniciar sesión de un usuario
    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const dto: LoginDto = {
                email: email,
                password: password,
            };

            const result = await this.authService.loginUser(dto);

            if (!result) {
                res.status(401).json({ error: "Usuario no encontrado" });
                return;
            }

            res.status(200).json(result);
            return;
        } catch (err) {
            res.status(500).json({
                error: "Error al iniciar sesión",
                details: err,
            });
            return;
        }
    };
}
