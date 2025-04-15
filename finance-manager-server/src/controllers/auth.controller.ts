import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../config/supabaseClient";

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    try {
        // Verificar si el usuario ya existe
        const { data: existingUser } = await supabase
            .from("users")
            .select("email")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const { data, error } = await supabase
            .from("users")
            .insert({ email, password: hashedPassword })
            .select();

        if (error) throw error;

        return res
            .status(201)
            .json({ message: "Usuario creado exitosamente", user: data?.[0] });
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Error al registrar usuario", details: err });
    }
};

// Función para iniciar sesión de un usuario
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    try {
        // Buscar al usuario por el correo electrónico
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la encriptada
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // En este punto, el usuario está autenticado
        return res.status(200).json({ message: "Login exitoso", user });
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Error al iniciar sesión", details: err });
    }
};
