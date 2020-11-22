import { IRouter, Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRouter {
  _router: IRouter;
  _authController: AuthController;

  constructor() {
    this._router = Router();
    this._authController = new AuthController();
    this.routes();
  }

  public routes(): void {
    this._router.post("/register", this._authController.register);
    this._router.post("/login", this._authController.login);
  }
}

export default AuthRouter;
