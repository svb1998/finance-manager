import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1]; // formato "Bearer <token>"

    if (!token) {
        res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // añadimos el usuario al request
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido o expirado" });
    }
};
