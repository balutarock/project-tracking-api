import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const attachmentTypeRoute = express.Router();

attachmentTypeRoute.post("/", verifyToken, createRoute);
attachmentTypeRoute.get("/attachmentType/search", verifyToken, searchRoute);
attachmentTypeRoute.delete("/:id", verifyToken, deleteRoute);
attachmentTypeRoute.put("/", verifyToken, updateRoute);
attachmentTypeRoute.get("/:id", verifyToken, getRoute);

export default attachmentTypeRoute;
