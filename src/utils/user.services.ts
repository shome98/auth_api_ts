import RefreshTokenModel, { IRefreshToken } from "../models/refreshToken.model";
import { IUser, User } from "../models/user.model";

export const findExistingUserByEmail = async (email: string) => {
  try {
    const existingUser = await User.findOne({ email });
    return existingUser;
  } catch (error) {
    console.error("❌ could not find the user.", error);
    throw error;
  }
};

export const createUser = async (obj: IUser) => {
  try {
    const newUser = await User.create({ ...obj });
    return newUser;
  } catch (error) {
    console.error("❌ Could not create the user.", error);
    throw error;
  }
};

export const findExistingUserWithPassword = async (
  email?: string,
  username?: string
) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).select("+password");
    return existingUser;
  } catch (error) {
    console.error("❌ could not find the user.", error);
    throw error;
  }
};

export const addOrUpdateRefreshToken = async (tokenObj: {
  userId: string;
  deviceInfo: string;
  token: string;
  expiresAt: Date;
}) => {
  try {
    const { userId, ...updateData } = tokenObj;

    const newOrUpdatedDocument = await RefreshTokenModel.findOneAndUpdate(
      { userId },
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return newOrUpdatedDocument;
  } catch (error) {
    console.error(
      "❌ Could not create/update the refresh token document.",
      error
    );
    throw error;
  }
};
