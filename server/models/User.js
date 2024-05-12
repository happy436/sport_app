import { Schema, model } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		require: true,
	},
	gender: {
		type: String,
		require: true,
        enum: ["male", "female"],
	},
});

const User = model("User", userSchema);
export default User;
