import { LoginDto } from "../../../application/auth/dto/Login.dto";
import { RegisterDto } from "../../../application/auth/dto/Register.dto";
import { ResLoginDto } from "../../../application/auth/dto/ResLogin.dto";
import { ResRegisterDto } from "../../../application/auth/dto/ResRegister.dto";

export interface IAuthRepository {
    register(dto: RegisterDto): Promise<ResRegisterDto>;
    login(dto: LoginDto): Promise<ResLoginDto>;
}
