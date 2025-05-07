import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
import process from "process";

if(!DB_URI){
    throw new Error("DB_URI is not defined");
}

const connectDB = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`connected to MongoDB`);

        }
     catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }

}

export default connectDB;
