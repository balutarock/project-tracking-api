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
import attachmentRoute from "./src/attachment/route";
import userEmailRoute from "./src/userEmail/route";
import reminderRoute from "./src/reminders/route";
import applicationType from "./src/applicationType/route";
import { scheduler } from "./src/reminderJob/reminder";
import applicationRoute from "./src/application/route";
import workflowRoute from "./src/workflow/route";
import attachmentTypeRoute from "./src/attachmentType/route";
import ticketsRoute from "./src/tickets/route";
import dashboardRoute from "./src/dashboard/route";

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

// Applications Route
app.use(`/v1/applications`, applicationRoute);

//Attachments Route
app.use(`/v1/attachment`, attachmentRoute);

//Reminders Route
app.use(`/v1/reminder`, reminderRoute);

//Application Type Route
app.use(`/v1/applicationType`, applicationType);

//User Email Routs
app.use(`/v1/userEmail`, userEmailRoute);

//Workflow Settings Route
app.use(`/v1/workflow`, workflowRoute);

//Attachment Type Route
app.use(`/v1/attachmentType`, attachmentTypeRoute);

// Dashboard routes
app.use(`/v1/dashboard`, dashboardRoute);

// Tickets Routes
app.use(`/v1/tickets`, ticketsRoute);

export default app;

scheduler();
