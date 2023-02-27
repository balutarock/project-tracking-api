import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const applicationType = express.Router();

applicationType.post("/", verifyToken, createRoute);
applicationType.get("/applicationType/search", verifyToken, searchRoute);
applicationType.delete("/:id", verifyToken, deleteRoute);
applicationType.put("/", verifyToken, updateRoute);
applicationType.get("/:id", verifyToken, getRoute);

export default applicationType;
