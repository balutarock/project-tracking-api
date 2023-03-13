import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const workflowRoute = express.Router();

workflowRoute.post("/", verifyToken, createRoute);
workflowRoute.get("/workflows/search", verifyToken, searchRoute);
workflowRoute.delete("/:id", verifyToken, deleteRoute);
workflowRoute.put("/", verifyToken, updateRoute);
workflowRoute.get("/:id", verifyToken, getRoute);

export default workflowRoute;
