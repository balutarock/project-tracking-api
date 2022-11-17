import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
const verifyToken = require("../../middleware/verifyToken");

const customerRoute = express.Router();

customerRoute.post("/", verifyToken, createRoute);
customerRoute.get("/customers/search/", verifyToken, searchRoute);
customerRoute.get("/", verifyToken, getRoute);
customerRoute.delete("/:id", verifyToken, deleteRoute);

export default customerRoute;
