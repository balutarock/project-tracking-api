import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const reminderRoute = express.Router();

reminderRoute.post("/", verifyToken, createRoute);
reminderRoute.get("/reminder/search/:appId", verifyToken, searchRoute);
reminderRoute.delete("/:id", verifyToken, deleteRoute);
reminderRoute.put("/", verifyToken, updateRoute);
reminderRoute.get("/:id", verifyToken, getRoute);

export default reminderRoute;
