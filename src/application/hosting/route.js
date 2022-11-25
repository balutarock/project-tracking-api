import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../../middleware/verifyToken");

const applicationHostingRoute = express.Router();

applicationHostingRoute.post("/", verifyToken, createRoute);
applicationHostingRoute.get("/application/search/", verifyToken, searchRoute);
applicationHostingRoute.put("/", verifyToken, updateRoute);
applicationHostingRoute.get("/:id", verifyToken, getRoute);

export default applicationHostingRoute;
