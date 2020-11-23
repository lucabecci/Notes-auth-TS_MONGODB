import { Request, Response } from "express";

import User, {IUser} from "../models/User";
class IndexController {

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const user: (IUser | null) = await User.findById(req.user);
    return res.status(200).json({
      success: true,
      message: `Hi ${user?.name}`,
      username: user?.username,
      email: user?.email
    });
  };

  public getIndex =  (req: Request, res: Response): Response => {
    return res.status(200).json({
      success: true,
      message: `Welcome to my api REST`
    });
  };
}



export default IndexController;
