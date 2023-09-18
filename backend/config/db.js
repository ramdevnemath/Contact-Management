import mongoose from "mongoose";

async function connectDB() {
    
    try {
        const dbUrl = process.env.MONGO_URI;
        // Establishing connection to MongoDB
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB`);
    }
    
    catch(error) {
        console.error(`MongoDB connection error: ${error}`)
    }
}

export default connectDB;