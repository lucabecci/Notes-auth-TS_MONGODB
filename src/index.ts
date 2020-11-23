import express, { Application } from "express";
import morgan from "morgan";
import passport from "passport";
import cors from 'cors'

import config from "./config/config";
import Database, { IDatabase } from "./database/database";
import passportMiddleware from "./middlewares/passport";

//routes
import IndexRouter, {IIndexRouter} from "./routes/index.routes";
import AuthRouter, {IAuthRouter} from "./routes/auth.routes";
import NotesRouter, {INotesRouter} from "./routes/notes.routes";

class App {
  _app: Application;
  _database: IDatabase;
  _indexRouter: IIndexRouter;
  _authRouter: IAuthRouter;
  _notesRouter: INotesRouter;

  constructor() {
    this._app = express();
    this._database = new Database();
    this._indexRouter = new IndexRouter();
    this._authRouter = new AuthRouter();
    this._notesRouter = new NotesRouter();

    this.database();
    this.config();
    this.routes();
  }

  public database(): void {
    this._database.connection();
  }

  public config(): void {
    this._app.set("port", config.PORT);
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(cors())
    this._app.use(morgan(`${config.DEVELOPMENT}`));
    this._app.use(passport.initialize());
    passport.use(passportMiddleware);
  }

  public routes(): void {
    this._app.use("/", this._indexRouter._router);
    this._app.use("/", this._authRouter._router);
    this._app.use("/notes", this._notesRouter._router);
  }

  public run(): void {
    this._app.listen(config.PORT, () => {
      console.log("Server on port:", config.PORT);
    });
  }
}

const app = new App();

app.run();
