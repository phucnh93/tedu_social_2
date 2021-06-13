import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dto/register.dto";
import UserServices from "./users.service";
export default class UsersController {
  private userSerivce = new UserServices();
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: RegisterDto = req.body;
      const tokenData = await this.userSerivce.createUser(model);
      res.status(201).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
}
