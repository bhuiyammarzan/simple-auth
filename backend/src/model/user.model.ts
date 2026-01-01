import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const saltRounds = 10;
  if (this.password) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
