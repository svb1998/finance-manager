export interface ResLoginDto {
    message: string;
    token: string;
    profile: {
        profileId: string;
        name: string;
    };
}
