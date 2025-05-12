import { IAuthRepository } from "../../../domain/auth/repositories/IAuthRepository";
import { RegisterDto } from "../dto/RegisterDto";

export class AuthService {
    constructor(public readonly authRepository: IAuthRepository) {}

    async registerUser(dto: RegisterDto) {
        const user = await this.authRepository.register(dto);

        return user;
    }

    async loginUser(dto: RegisterDto) {
        const user = await this.authRepository.login(dto);

        return user;
    }
}
