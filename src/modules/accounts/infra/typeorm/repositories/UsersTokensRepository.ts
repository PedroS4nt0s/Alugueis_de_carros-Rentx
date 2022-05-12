import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens)
    }
    async create({ //gerando usertoken 
        user_id,
        refresh_token, 
        expires_date, 
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });
    await this.repository.save(userToken);

    return userToken;
    }

    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }


}

export { UsersTokensRepository }