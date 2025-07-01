import { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { createUser, findExistingUserByEmail } from "../utils/user.services";

export const register = async (req: Request, res: Response) => {
  const reqObj: IUser = req.body;
  const { email, password } = reqObj;
  if (!email) {
    return res.json({ error: "😒 Please enter a valid email to continue." });
  }
  if (!password) {
    return res.json({ error: "😒 Please enter a valid password to continue." });
  }
  try {
    const existingUser = await findExistingUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: "😊 Provided email is already associated with an account.",
      });
    }
    const newUser = await createUser(reqObj);
    return res
      .status(201)
      .json({ message: "✅ User registered successfully.", user: newUser });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    return res.status(500).json({ error: "⚠️ Failed to register the user." });
  }
};
