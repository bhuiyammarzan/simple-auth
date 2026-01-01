import dotenv from "dotenv";
import initializeApp from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    // db connection
    await connectDB();

    // app instance
    const app = await initializeApp();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log("Failed to start server!", error);
    process.exit(1);
  }
};

startServer();
