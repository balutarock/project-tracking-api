import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getList from "./getList";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const serverRoute = express.Router();

serverRoute.get("/list", verifyToken, getList);
serverRoute.post("/", verifyToken, createRoute);
serverRoute.get("/servers/search/", verifyToken, searchRoute);
serverRoute.get("/:id", verifyToken, getRoute);
serverRoute.delete("/:id", verifyToken, deleteRoute);
serverRoute.put("/", verifyToken, updateRoute);

export default serverRoute;
