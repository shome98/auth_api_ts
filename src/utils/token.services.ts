import jwt from "jsonwebtoken";
import config from "../environment/config";
import { IUser } from "../models/user.model";
interface IUserJwt {
  id: string;
  role: string | string[];
  email: string;
  username: string;
}
export function generateAccesssToken(userObj: IUser) {
  return jwt.sign(
    {
      id: userObj._id ? userObj._id : userObj.id,
      role: userObj.roles,
      email: userObj.email,
      username: userObj.username,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRY || "1h" }
  );
}
export function generateRefreshAccesssToken(userObj: IUser) {
  return jwt.sign(
    {
      id: userObj._id ? userObj._id : userObj.id,
      role: userObj.roles,
      email: userObj.email,
      username: userObj.username,
    },
    config.JWT_REFRESH_SECRET,
    { expiresIn: config.JWT_REFRESH_EXPIRY || "7d" }
  );
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.JWT_SECRET) as IUserJwt;
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as IUserJwt;
}
