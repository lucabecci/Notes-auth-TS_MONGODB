import dotenv from 'dotenv'

dotenv.config()


export interface IConfig {
  DB: {
    URI: string;
    USER: string;
    KEY: string;
  };
  PORT: string | number;
  JWT_KEY: string;
  DEVELOPMENT: string;
}

export default <IConfig>{
  DB: {
    URI: process.env.DB_URI || "mongodb://localhost/authbooks",
    USER: process.env.DB_USER || "",
    KEY: process.env.DB_KEY || "",
  },
  PORT: process.env.PORT || 4000,
  JWT_KEY: process.env.JWT || 'test' ,
  DEVELOPMENT: process.env.DEVELOPMENT || "dev"
};
