import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const applicationRoute = express.Router();

applicationRoute.post("/", verifyToken, createRoute);
applicationRoute.get("/application/search/", verifyToken, searchRoute);
applicationRoute.put("/", verifyToken, updateRoute);
applicationRoute.get("/:id", verifyToken, getRoute);

export default applicationRoute;
