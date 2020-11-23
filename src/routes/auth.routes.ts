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
    /**
   * @route   POST /register
   * @desc    Register in the app
   * @access  Public
   **/
    this._router.post("/register", this._authController.register);
    /**
   * @route   POST /login
   * @desc    Login in the app
   * @access  Public
   **/
    this._router.post("/login", this._authController.login);
  }
}

export interface IAuthRouter {
  _router: IRouter,
  _authController: AuthController,
  routes: () => void
}

export default AuthRouter;
