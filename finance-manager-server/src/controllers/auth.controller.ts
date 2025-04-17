import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../config/supabaseClient";
import jwt from "jsonwebtoken";

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña requeridos" });
        return;
    }

    try {
        // Verificar si el usuario ya existe
        const { data: existingUser } = await supabase
            .from("users")
            .select("email")
            .eq("email", email)
            .single();

        if (existingUser) {
            res.status(409).json({ error: "El usuario ya existe" });
            return;
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const { data, error } = await supabase
            .from("users")
            .insert({ email, password: hashedPassword })
            .select();

        if (error) throw error;

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: data?.[0],
        });

        return;
    } catch (err) {
        res.status(500).json({
            error: "Error al registrar usuario",
            details: err,
        });
        return;
    }
};

// Función para iniciar sesión de un usuario
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ error: "Email y contraseña requeridos" });
            return;
        }

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            res.status(401).json({ error: "Usuario no encontrado" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ error: "Contraseña incorrecta" });
            return;
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login exitoso",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
        return;
    } catch (err) {
        res.status(500).json({
            error: "Error al iniciar sesión",
            details: err,
        });
        return;
    }
};
