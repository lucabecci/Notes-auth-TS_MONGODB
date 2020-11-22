import {IRouter, Router} from 'express'
import AuthController from '../controllers/auth.controller'

class AuthRouter {
    _router: IRouter
    _authController: AuthController
    
    constructor(){
        this._router = Router()
        this._authController = new AuthController
        this.routes()
    }

    public routes(): void {
        this._router.get('/register', this._authController.register)
        this._router.get('/login', this._authController.login)
    }
}

export default AuthRouter