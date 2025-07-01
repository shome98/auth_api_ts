import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import connectToDatabase from "./db/connect.db";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("😊 Welcome to api!!!!");
});

app.use("/api/v1/auth", authRoutes);

connectToDatabase()
  .then(() => console.log("✅ Connected to database"))
  .catch((error) => console.log("❌ Database connection Failed with ", error));

app.listen(process.env.PORT, () =>
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
);

export default app;
