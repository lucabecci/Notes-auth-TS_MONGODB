import {Request, Response} from 'express'


class NotesController {
    public getNotes = (req: Request, res: Response): void => {
        res.send('notes')
    }
}


export default NotesController