import express from "express";
import getRoute from "./getRoute";

const verifyToken = require("../../middleware/verifyToken");

const dashboardRoute = express.Router();

dashboardRoute.get("/", verifyToken, getRoute);

export default dashboardRoute;
