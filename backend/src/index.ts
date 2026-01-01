import dotenv from "dotenv";
import initializeApp from "./app";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    const app = await initializeApp();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log("Failed to start server!", error);
    process.exit(1);
  }
};

startServer();
