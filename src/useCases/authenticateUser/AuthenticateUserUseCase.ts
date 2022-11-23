import { client } from "../../prisma/client";

import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken';
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    // Verificar se o usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      }
    });

    if(!userAlreadyExists) {
      throw new Error("User or password incorrect!");
    }

    // Verificar se a senha esta correta
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if(!passwordMatch) {
      throw new Error("User or password incorrect!");
    }

    // Gerar token do usuario (JWT)
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      }
    })

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  }
}