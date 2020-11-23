import mongoose, { ConnectionOptions, Mongoose } from "mongoose";
import config, { IConfig } from "../config/config";

export interface IDatabase {
  _mongoose: Mongoose;
  _config: IConfig;
  _options: ConnectionOptions;
  connection: () => Promise<void>;
}

class Database {
  _mongoose: Mongoose;
  _config: IConfig;
  _options: ConnectionOptions;
  constructor() {
    this._mongoose = mongoose;
    this._config = config;
    this._options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
  }

  public async connection(): Promise<void> {
    try {
      await this._mongoose.connect(this._config.DB.URI, this._options);
      console.log("DB is connected");
    } catch (e) {
      console.log("DB is not connected");
    }
  }
}

export default Database;
