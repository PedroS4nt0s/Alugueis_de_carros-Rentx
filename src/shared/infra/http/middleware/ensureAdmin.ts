import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(//ensureAdmin é um middleware que verifica se o usuário é admin
    request: Request,
    response: Response,
    next: NextFunction
){
    const {id} = request.user;//pega o id do usuário que está logado

    const userRepository = new UsersRepository();//instancia o repositório de usuários
    const user = await userRepository.findById(id);//busca o usuário pelo id

    if(!user.isAdmin){//se o usuário não for admin
        throw new AppError("User is not admin");//lança um erro
    }
    return next();//se for admin, continua a execução
}