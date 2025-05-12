import { LoginDto } from "../../../application/auth/dto/LoginDto";
import { RegisterDto } from "../../../application/auth/dto/RegisterDto";
import { ResLoginDto } from "../../../application/auth/dto/ResLoginDto";
import { ResRegisterDto } from "../../../application/auth/dto/ResRegisterDto";

export interface IAuthRepository {
    register(dto: RegisterDto): Promise<ResRegisterDto>;
    login(dto: LoginDto): Promise<ResLoginDto>;
}
