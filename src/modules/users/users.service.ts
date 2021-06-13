import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils/helpers";
import { DataStoredInToken, TokenData } from "@modules/auth";
import RegisterDto from "./dto/register.dto";
import UserSchema from "./users.model";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import IUser from "./users.interface";
import jwt from "jsonwebtoken";
class UserService {
  public userSchema = UserSchema;

  public async createUser(model: RegisterDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findOne({ email: model.email });
    if (user) {
      throw new HttpException(400, `Your email ${model.email} already exist.`);
    }

    const avatar = gravatar.url(model.email!, {
      size: "200",
      rating: "0",
      default: "mm",
    });

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(model.password!, salt);
    const createdUser: IUser = await this.userSchema.create({
      ...model,
      password: hashedPassword,
      avatar: avatar,
      date: Date.now(),
    });
    return this.createdToken(createdUser);
  }

  private createdToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn = 3600;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
    };
  }
}

export default UserService;
