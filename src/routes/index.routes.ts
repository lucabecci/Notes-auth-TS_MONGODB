import { Router, IRouter } from "express";
import passport from 'passport'

import IndexController from "../controllers/index.controller";
class IndexRouter {
  _router: IRouter;
  _indexController: IndexController;
  constructor() {
    this._router = Router();
    this._indexController = new IndexController();
    this.routes();
  }

  public routes(): void {
    this._router.get("/", 
    passport.authenticate("jwt", { session: false }),
    this._indexController.getIndex);
  }
}

export default IndexRouter;
