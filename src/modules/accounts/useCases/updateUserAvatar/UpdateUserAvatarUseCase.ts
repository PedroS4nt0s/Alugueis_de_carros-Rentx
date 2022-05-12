import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    //add coluna avatar na tabela  -> migration <-
    //refatorar usuario com coluna avatar
    //Configuração upload multer
    //criar regra de negocio do upload 
    //vrial controller
    constructor(@inject("UsersRepository")
    private userRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id);

        if (user.avatar) {
        await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatar_file;
        
        await this.userRepository.create(user)
    }
}
export { UpdateUserAvatarUseCase }