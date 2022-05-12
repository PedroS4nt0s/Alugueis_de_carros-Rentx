import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/containers/providers/mailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider

  ) {}

  async execute(email: string){

    const templatePath = resolve(
        __dirname,
        "..",
        "..",
        "views",
        "emails",
        "forgotPassword.hbs"
    );
    
    const user = await this.usersRepository.findByEmail(email);
    console.log("email que solicitou=",email)
    console.log("variavel está recebendo=",user)
  
    if(!user) {
      throw new AppError("User does not exists! <--");
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };