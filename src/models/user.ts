import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({});

const userModel = mongoose.model("users", userSchema);

export default userModel;