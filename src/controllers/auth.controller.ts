import { Request, Response, Handler } from "express";
import jwt from "jsonwebtoken";

import Checks, { IChecks } from "../helpers/checks";
import User, { IUser } from "../models/User";
import config from "../config/config";

class AuthController {
  _checks: IChecks;

  constructor() {
    this._checks = new Checks();
  }
  public createToken = (user: IUser): string => {
    return jwt.sign({ id: user._id }, config.JWT_KEY, {
      expiresIn: 43200,
    });
  };

  public register: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { name, username, email, password } = req.body;
      const bodyChecked = this._checks.checkRegister(
        name,
        username,
        email,
        password
      );
      if (bodyChecked) {
        return res.status(400).json({
          succes: false,
          message: "Please send all camps",
        });
      }
      const userChecked = await User.findOne({ email: email });
      if (userChecked) {
        return res.status(400).json({
          success: false,
          msg: "Email already exists, try again with correct email",
        });
      }
      const passwordChecked = this._checks.checkPassword(password);
      if (passwordChecked) {
        return res.status(400).json({
          success: false,
          msg: "Password long",
        });
      }
      const newUser = new User({
        name,
        username,
        email,
        password,
      });
      await newUser.save();
      return res.status(200).json({
        succes: true,
        newUser,
      });
    } catch (e) {
      return res.status(500).json({
        succes: false,
        message: "Internal server ERROR, try later",
      });
    }
  };

  public login: Handler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Your email doesnt exists",
      });
    }
    const passwordChecked = this._checks.checkPassword(password);
    if (passwordChecked) {
      return res.status(400).json({
        success: false,
        msg: "Password long",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const passwordMatch = await user.comparePassword(password);

    if (passwordMatch) {
      return res.status(200).json({
        success: true,
        token: this.createToken(user),
      });
    }
    return res.status(400).json({
      success: false,
      msg: "Password incorrect, please insert a valid password",
    });
  };
}

export default AuthController