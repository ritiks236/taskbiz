import mongoose, { Document, Schema } from "mongoose";

interface UserProps extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserProps>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserProps>("User", userSchema);

export default User;
