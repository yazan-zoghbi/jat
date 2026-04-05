import mongoose from "mongoose";

export const connectDB = async () => {

    const url = process.env.MONGO_URI!;
    await mongoose.connect(url)
    console.log('MongoDB Connected');


}