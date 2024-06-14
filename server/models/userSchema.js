import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastname: { type: String, required: [true, "Please enter your last name"] },
  username: { type: String, required: [true, "Please enter your username"] },
  email: { type: String, required: [true, "Please enter your email"] },
  password: { type: String, required: [true, "Please enter your password"] },
});
export default mongoose.model("User", userSchema);
