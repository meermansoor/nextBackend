import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

if(!process.env.DB_URI){
    throw new Error("DB_URI is not defined");
}

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log(`connected to MongoDB`);

        }
     catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }

}

export default connectDB;
