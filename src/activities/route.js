import express from "express";
import searchRoute from "./activitySearch";
const verifyToken = require("../../middleware/verifyToken");

const activityRoute = express.Router();

activityRoute.get("/search/", verifyToken, searchRoute);

export default activityRoute;
