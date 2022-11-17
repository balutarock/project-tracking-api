import express from "express";
import searchRoute from "./searchRoute";
const verifyToken = require("../../middleware/verifyToken");

const activityRoute = express.Router();

activityRoute.get("/activity/search/", verifyToken, searchRoute);

export default activityRoute;
