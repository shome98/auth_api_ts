import mongoose, { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserAddress {
  address?: string | null;
  city?: string | null;
  country?: string | null;
  pincode: number | null;
}
export interface IUser extends Document, IUserAddress {
  email: string;
  username: string | null;
  password: string;
  fullName?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  roles: string[] | null;
  emailVerified?: boolean | false;
  twoFactorEnabled?: boolean | false;
  twoFactorSecret?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  refreshToken?: string | null;
  refreshTokenExpires?: Date | null;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: { type: String, required: false, trim: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    roles: { type: [String], default: ["user"] },
    emailVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    refreshToken: { type: String, default: null },
    refreshTokenExpires: { type: Date, default: null },
    address: { type: String, default: null },
    country: { type: String, default: null },
    city: { type: String, default: null },
    pincode: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || model<IUser>("User", UserSchema);
