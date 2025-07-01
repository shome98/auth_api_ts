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
    const createdUser = await User.findById(newUser._id);
    return createdUser;
  } catch (error) {
    console.error("❌ Could not create the user.");
    throw error;
  }
};

export const findExistingUserWithPassword = async (email?: string,username?:string) => {
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] }).select("+password");
    return existingUser;
  } catch (error) {
    console.error("❌ could not find the user.", error);
    throw error;
  }
};