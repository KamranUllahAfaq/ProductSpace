import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import topicRoutes from "./routes/topic.js";
import jobRoutes from "./routes/job.js";
import ambassadorRoutes from "./routes/ambassador.js";
import cloudinary from "cloudinary";
import productRoutes from "./routes/product.js";
import discussionRoutes from "./routes/discussion.js";
import candidateRoutes from "./routes/candidate.js";
import storyRoutes from "./routes/story.js";
import eventRoutes from "./routes/event.js";
import toolRoutes from "./routes/tools.js";
import collectionRoutes from "./routes/collection.js";

import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const app = express();
cloudinary.config({
  cloud_name: "daxegccow",
  api_key: "414244689927931",
  api_secret: "R9yuV_PTax3jdWc185fAmFgxaXg",
});
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "uploads")));
// app.use(function (req, res, next) {
//   // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000",);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, PUT"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.post("/auth/register", register);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/topic", topicRoutes);
app.use("/job", jobRoutes);
app.use("/ambassador", ambassadorRoutes);
app.use("/discussion", discussionRoutes);
app.use("/candidate", candidateRoutes);
app.use("/event", candidateRoutes);
app.use("/stories", storyRoutes);
app.use("/events", eventRoutes);
app.use("/collection", collectionRoutes);

app.use("/tools", toolRoutes);

// Mongoose Setup
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 6001;
// mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`App Connected on PORT ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
