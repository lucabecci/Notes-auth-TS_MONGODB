import { Router, IRouter } from "express";
import passport from 'passport'


import NotesController from "../controllers/notes.controller";

class NotesRouter {
  _router: IRouter;
  _notesController: NotesController;
  constructor() {
    this._router = Router();
    this._notesController = new NotesController();
    this.routes();
  }

  public routes(): void {

    this._router.get("/", 
    passport.authenticate("jwt", { session: false }),
    this._notesController.getNotes);

    this._router.post('/', 
    passport.authenticate("jwt", { session: false }),
    this._notesController.createNote)

    //:id
    this._router.get('/:id', 
    passport.authenticate("jwt", { session: false }),
    this._notesController.getNote)

    this._router.delete('/:id', 
    passport.authenticate("jwt", { session: false }),
    this._notesController.deleteNote)

    this._router.put('/:id', 
    passport.authenticate("jwt", { session: false }),
    this._notesController.editNote)
  }
}

export default NotesRouter;
