import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
    create({
        refresh_token,
        expires_date,
        user_id
    }: ICreateUserTokenDTO): Promise<UserTokens>;

    findByRefreshToken(
        refresh_token: string,
    ): Promise<UserTokens>

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;

    deleteById(
        id: string
    ): Promise<void>;
}

export { IUsersTokensRepository };