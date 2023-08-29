import { BadRequestError, Conflict, NotFound } from "../../core/error.response";
import { UserDTO } from "../../types/user.type";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  static signUp = async ({ email, password }: UserDTO): Promise<UserDTO> => {
    if (!email || !password)
      throw new BadRequestError("Missing data to signup !", {
        email,
        password,
      });
    //   CHECK USER
    const checkUser: UserDTO | null = await User.findOne({ email });
    if (checkUser) {
      throw new Conflict("User already exists !", { email });
    }
    // HASH PASSWORD
    password = await bcrypt.hash(password, 10);
    //   CREATE USER
    const user = await User.create({ email, password });
    return user;
  };

  static signIn = async ({
    email,
    password,
  }: UserDTO): Promise<{ accessToken: string }> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound("email or password is incorrect !", { email });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw new BadRequestError("email or password is incorrect !");
    const accessToken = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY!);
    return { accessToken };
  };
}
export { UserService };
