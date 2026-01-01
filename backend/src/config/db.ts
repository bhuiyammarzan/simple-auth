import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      `Mongodb connected!\nDB-HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connected failed!", error);
    process.exit(1);
  }
};

export default connectDB;
