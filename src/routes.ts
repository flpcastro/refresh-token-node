import { Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

routes.post("/users", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post("/refresh-token", refreshTokenUserController.handle);

routes.get("/courses", ensureAuthenticated,(request, response) => {
  return response.json([
    { id: 1, name: "NodeJS"},
    { id: 2, name: "ReactJS"},
    { id: 3, name: "React Native"},
    { id: 4, name: "Flutter"},
    { id: 5, name: "Golang"},
  ]);
});

export { routes };