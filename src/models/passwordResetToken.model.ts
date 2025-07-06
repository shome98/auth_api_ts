import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IPasswordResetToken extends Document {
  userId: string | Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const PasswordResetTokenSchema: Schema<IPasswordResetToken> = new Schema(
  {
    userId: {
      type: String || Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PasswordResetTokenModel =
  mongoose.models.PasswordResetToken ||
  model<IPasswordResetToken>("PasswordResetToken", PasswordResetTokenSchema);
export default PasswordResetTokenModel;
