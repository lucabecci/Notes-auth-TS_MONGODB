import {Request, Response} from 'express'


class AuthController {
    public register = (req: Request, res: Response): void => {
        res.send('register')
    }

    public login = (req: Request, res: Response): void => {
        res.send('login')
    }
}


export default AuthController