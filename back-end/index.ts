import bodyParser from "body-parser";
import express from "express";
import * as dotenv from "dotenv";
import PostRouter from "./src/routes/postRoutes";
import EventRouter from "./src/routes/eventRoutes";
import UserRouter from "./src/routes/userRoutes";
import AuthRouter from "./src/routes/authRoutes";
import { sendEmail } from "./src/utils/sendEmail";
import { handleException } from "src/exceptions/handleException";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const contextPath = "/api/v1";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(`${contextPath}/auth`, AuthRouter);
app.use(`${contextPath}/posts`, PostRouter);
app.use(`${contextPath}/events`, EventRouter);
app.use(`${contextPath}/users`, UserRouter);
