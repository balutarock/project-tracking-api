import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getList from "./getList";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const customerRoute = express.Router();

customerRoute.get("/list", verifyToken, getList);
customerRoute.post("/", verifyToken, createRoute);
customerRoute.get("/customers/search/", verifyToken, searchRoute);
customerRoute.get("/:id", verifyToken, getRoute);
customerRoute.delete("/:id", verifyToken, deleteRoute);
customerRoute.put("/", verifyToken, updateRoute);

export default customerRoute;
