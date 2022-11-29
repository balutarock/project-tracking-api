import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../../middleware/verifyToken");

const applicationHostingRoute = express.Router();

applicationHostingRoute.post("/", verifyToken, createRoute);
applicationHostingRoute.get(
    "/hostingApplication/search/",
    verifyToken,
    searchRoute
);
applicationHostingRoute.put("/", verifyToken, updateRoute);
applicationHostingRoute.delete("/:id", verifyToken, deleteRoute);
applicationHostingRoute.get("/:id", verifyToken, getRoute);

export default applicationHostingRoute;
