import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import multiparty from "connect-multiparty";

//Routes
import userRoute from "./src/user/route";
import roleRoute from "./src/role/route";
import settingsRoute from "./src/settings/route";
import customerRoute from "./src/customers/route";
import activityRoute from "./src/activities/route";
import serverRoute from "./src/server/route";
import applicationRoute from "./src/application.js/route";
import attachmentRoute from "./src/attachment/route";

dotenv.config();

// initialize app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb" }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

// middleware for handling multipart/form-data
app.use(multiparty());

// cors support
app.use(cors());

// add compression
app.use(compression());

// logs
app.use(logger("dev"));

// cookie support
app.use(cookieParser());

//User Routes
app.use(`/v1/user`, userRoute);

//Role Routes
app.use(`/v1/role`, roleRoute);

//Settings Route
app.use(`/v1/settings`, settingsRoute);

//Customers Route
app.use(`/v1/customers`, customerRoute);

//Activity Route
app.use(`/v1/activities`, activityRoute);

//Server Route
app.use(`/v1/server`, serverRoute);

//Applications Route
app.use(`/v1/application`, applicationRoute);

//Attachments Route
app.use(`/v1/attachment`, attachmentRoute);

export default app;
