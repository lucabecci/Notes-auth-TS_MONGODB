import { Router, IRouter } from "express";
import passport from "passport";

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
     /**
     * @route   GET /notes
     * @desc    Get all notes
     * @access  Private(Auth)
     **/
    this._router.get(
      "/",
      passport.authenticate("jwt", { session: false }),
      this._notesController.getNotes
    );

     /**
     * @route   PUT /notes
     * @desc    Create a note
     * @access  Private(Auth)
     **/
    this._router.post(
      "/",
      passport.authenticate("jwt", { session: false }),
      this._notesController.createNote
    );

     /**
     * @route   GET /notes/:id
     * @desc    Get note
     * @access  Private(Auth)
     **/
    this._router.get(
      "/:id",
      passport.authenticate("jwt", { session: false }),
      this._notesController.getNote
    );

     /**
     * @route   DELETE /notes/:id
     * @desc    Delete note
     * @access  Private(Auth)
     **/
    this._router.delete(
      "/:id",
      passport.authenticate("jwt", { session: false }),
      this._notesController.deleteNote
    );

     /**
     * @route   PUT /notes/:id
     * @desc    Update note
     * @access  Private(Auth)
     **/
    this._router.put(
      "/:id",
      passport.authenticate("jwt", { session: false }),
      this._notesController.editNote
    );
  }
}


export interface INotesRouter {
  _router: IRouter;
  _notesController: NotesController;
  routes: () => void;
}

export default NotesRouter;
