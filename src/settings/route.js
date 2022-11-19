import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import saveRoute from "./saveRoute";
const verifyToken = require("../../middleware/verifyToken");

const settingsRoute = express.Router();

settingsRoute.post("/", verifyToken, createRoute);
settingsRoute.get("/", verifyToken, getRoute);
settingsRoute.post("/portal", verifyToken, saveRoute);

export default settingsRoute;
