import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "e5d44932a2fb0e47098535fde6499d22", {
      subject: userId,
      expiresIn: "20s"
    });

    return token;
  }
}