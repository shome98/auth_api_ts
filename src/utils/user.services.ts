import { IUser, User } from "../models/user.model"

const findExistingUSerByEmail = async (email: string) => {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser;
    } catch (error) {
        console.error("❌ could not find the user.", error);
        throw error;
    }
}

const createUser = async (obj: IUser) => {
    try {
        const newUser = await User.create({ ...obj });
        return newUser;
    } catch (error) {
        console.error("❌ Could not create the user.");
        throw error;
    }
}