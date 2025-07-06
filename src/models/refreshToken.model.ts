import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IRefreshToken extends Document {
  userId: string | Schema.Types.ObjectId;
  token: string;
  deviceInfo: string | null;
  expiresAt: Date;
}

const RefreshTokenSchema: Schema<IRefreshToken> = new Schema(
  {
    userId: {
      type: String || Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    deviceInfo: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const RefreshTokenModel =
  mongoose.models.RefreshToken ||
  model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
export default RefreshTokenModel;
