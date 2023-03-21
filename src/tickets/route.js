import express from "express";
import createRoute from "./createRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const ticketsRoute = express.Router();

ticketsRoute.post("/", verifyToken, createRoute);
ticketsRoute.get("/search", verifyToken, searchRoute);
ticketsRoute.get("/:id", verifyToken, getRoute);
ticketsRoute.put("/", verifyToken, updateRoute);

export default ticketsRoute;
