import {Request, Response} from 'express'


class IndexController {
    public getIndex = (req: Request, res: Response): void => {
        res.send('hello')
    }
}


export default IndexController