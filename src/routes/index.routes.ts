import { Router, IRouter } from "express";
import passport from "passport";

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
     /**
     * @route   GET /
     * @desc    Get the index information
     * @access  Public
     **/
    this._router.get("/", this._indexController.getIndex);

     /**
     * @route   GET /user
     * @desc    Get the user information
     * @access  Private(Auth)
     **/
    this._router.get('/user', 
    passport.authenticate("jwt", { session: false }),
    this._indexController.getUser)
  }
}


export interface IIndexRouter {
  _router: IRouter;
  _indexController: IndexController;
  routes: () => void;
}
export default IndexRouter;
