import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) {
    return response.status(401).json({
      message: "Token is missing"
    })
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "e5d44932a2fb0e47098535fde6499d22")

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Token invalid"
    })
  }
}