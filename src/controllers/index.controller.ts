import { Request, Response } from "express";


import User from '../models/User'
class IndexController {
  public getIndex = async(req: Request, res: Response): Promise<Response> => {
    const user = await User.findById(req.user)

    return res.status(200).json({
      success: true,
      message: `Hi ${user?.name}`,
      email: user?.email,
      username: user?.username
    })

  };
}

export default IndexController;
