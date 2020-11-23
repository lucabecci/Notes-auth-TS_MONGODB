import { Request, Response, Handler } from "express";

import Note from "../models/Note";
import Checks, { IChecks } from "../helpers/checks";
class NotesController {
  public _checks: IChecks;

  constructor() {
    this._checks = new Checks();
  }

  public getNotes: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = req.user;
      const notes = await Note.find({ user_id: id });
      if (notes.length < 1) {
        return res.status(400).json({
          success: false,
          message: "Insert notes",
        });
      }
      return res.status(200).json({
        success: true,
        notes,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Internal server ERROR, try later",
      });
    }
  };

  public createNote: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { title, description, category } = req.body;
      const id = req.user;
      const checked = this._checks.checkCamps(title, description, category);
      if (checked) {
        return res.status(400).json({
          success: false,
          message: "Please send all camps",
        });
      }
      const note = new Note({
        title,
        description,
        category,
        user_id: id,
      });
      await note.save();
      return res.status(200).json({
        success: true,
        note,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Internal server ERROR, try later",
      });
    }
  };

  public getNote: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id: string = req.params.id;
      const checked = this._checks.checkID(id);
      if (checked) {
        return res.status(400).json({
          success: false,
          message: "ID invalid, send a valid ID",
        });
      }
      const note = await Note.find({_id: id, user_id: req.user});
      if (note == null || note.length < 1) {
        return res.status(400).json({
          success: false,
          message: "ID invalid, send a valid ID",
        });
      }
      return res.status(200).json({
        success: true,
        note,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Internal server ERROR, try later",
      });
    }
  };

  public deleteNote: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id: string = req.params.id;
      const checked = this._checks.checkID(id);
      if (checked) {
        return res.status(400).json({
          success: false,
          message: "ID invalid, send a valid ID",
        });
      }
      const note = await Note.findOneAndDelete({_id: id, user_id: req.user});
      if (note == null) {
        return res.status(400).json({
          success: false,
          message: "ID invalid, send a valid ID",
        });
      }
      return res.status(200).json({
        success: true,
        note,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Internal server ERROR, try later",
      });
    }
  };
  
  public editNote: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id: string = req.params.id;
      const { title, description, category } = req.body;
      const checkID = this._checks.checkID(id);
      const checkBody = this._checks.checkCamps(title, description, category);
      if (checkID) {
        return res.status(400).json({
          success: false,
          message: "ID invalid, send a valid ID",
        });
      } else if (checkBody) {
        return res.status(400).json({
          success: false,
          message: "Please send all camps",
        });
      }
      try {
        const note = await Note.findOneAndUpdate(
          {_id: id, user_id: req.user},
          { title, description, category },
          { new: true }
        );
        return res.status(200).json({
          success: true,
          note,
        });
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Please send all camps",
        });
      }
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Internal server ERROR, try later",
      });
    }
  };
}

export default NotesController;
