import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
  sub: string;

}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  console.log('authHeader \n', authHeader);

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
  console.log("split",[, token])

  try {
    const { sub: user_id } = verify(
        token, 
        auth.secret_refresh_token
        ) as IPayload;
        console.log("Verificação",{ sub: user_id })

     //const usersRepository = new UsersRepository();

     const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
     console.log("user_id e token", user)

     if(!user) { 
        throw new AppError("User does not found", 401);
    }

    const dados = request.user = {
      id: user_id,
    };
    console.log("Request", dados)

    next();
  } catch (error) {
    throw new AppError("Invalid Token!", 401);
  }
}