import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const attachmentRoute = express.Router();

attachmentRoute.post("/", verifyToken, createRoute);
attachmentRoute.get("/attachment/search/", verifyToken, searchRoute);
attachmentRoute.delete("/:id", verifyToken, deleteRoute);
attachmentRoute.put("/", verifyToken, updateRoute);
attachmentRoute.get("/:id", verifyToken, getRoute);

export default attachmentRoute;
