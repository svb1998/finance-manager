import { LoginDto } from "../../application/auth/dto/Login.dto";
import { RegisterDto } from "../../application/auth/dto/Register.dto";
import { ResLoginDto } from "../../application/auth/dto/ResLogin.dto";
import { ResRegisterDto } from "../../application/auth/dto/ResRegister.dto";
import { supabase } from "../../config/supabaseClient";
import { IAuthRepository } from "../../domain/auth/repositories/IAuthRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class SupabaseAuthRepository implements IAuthRepository {
    async register(dto: RegisterDto): Promise<ResRegisterDto> {
        const { email, password } = dto;

        // Verificar si el usuario ya existe
        const { data: existingUser, error: getUserError } = await supabase
            .from("Users")
            .select("email")
            .eq("email", email)
            .single();

        if (getUserError) throw new Error(getUserError.message);

        if (existingUser) {
            throw new Error("El usuario ya existe");
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const { data, error: insertUserError } = await supabase
            .from("Users")
            .insert({ email, password: hashedPassword })
            .select();

        if (insertUserError) throw new Error(insertUserError.message);

        const response: ResRegisterDto = {
            message: "Usuario creado exitosamente",
            userUUID: data[0],
        };

        return response;
    }

    async login(dto: LoginDto): Promise<ResLoginDto> {
        const { email, password } = dto;

        const { data: user, error } = await supabase
            .from("Users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            throw new Error("Usuario no encontrado");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }

        const token = jwt.sign(
            {
                id: user.userId,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            }
        );

        const { data: profile, error: getProfileError } = await supabase
            .from("Profiles")
            .select()
            .eq("userId", user.userId)
            .single();

        if (getProfileError) throw new Error(getProfileError.message);

        const response = {
            message: "Login exitoso",
            token,
            profile: {
                profileId: profile?.profileId,
                name: profile?.name,
            },
        };
        return response;
    }
}
