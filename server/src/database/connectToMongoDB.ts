import mongoose from "mongoose";
import { app } from "../socket/socket";

const connectToMongoDB = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGO_URI || '');
		console.log("Connected to MongoDB");
	} catch (error: any) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;