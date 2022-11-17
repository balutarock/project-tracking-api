import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import saveRoute from "./saveRoute";
import uploadMedia from "./uploadMedia";
const verifyToken = require("../../middleware/verifyToken");

const settingsRoute = express.Router();

settingsRoute.post("/", verifyToken, createRoute);
settingsRoute.post("/media", verifyToken, uploadMedia);
settingsRoute.get("/", verifyToken, getRoute);
settingsRoute.post("/portal", verifyToken, saveRoute);

export default settingsRoute;
