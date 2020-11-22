import {Router, IRouter} from 'express'
import NotesController from '../controllers/notes.controller'

class NotesRouter {
    _router: IRouter
    _notesController: NotesController
    constructor(){
        this._router = Router()
        this._notesController = new NotesController 
        this.routes()
    }

    public routes(): void {
        this._router.get('/', this._notesController.getNotes)
    }
}

export default NotesRouter