import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../../middleware/verifyToken");

const applicationSupportHoursRoute = express.Router();

applicationSupportHoursRoute.post("/", verifyToken, createRoute);
applicationSupportHoursRoute.get(
    "/supportHoursApplication/search/",
    verifyToken,
    searchRoute
);
applicationSupportHoursRoute.put("/", verifyToken, updateRoute);
applicationSupportHoursRoute.delete("/:id", verifyToken, deleteRoute);
applicationSupportHoursRoute.get("/:id", verifyToken, getRoute);

export default applicationSupportHoursRoute;
