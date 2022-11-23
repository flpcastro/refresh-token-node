import { client } from "../../prisma/client";
import { hash } from "bcrypt";

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

export class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verificar se o usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!")
    }

    // Criptografar password
    const passwordHash = await hash(password, 10);

    // Cadastra o usuario
    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      }
    })

    return user;
  }
}