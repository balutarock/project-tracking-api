import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
const verifyToken = require("../../../middleware/verifyToken");

const applicationProductsRoute = express.Router();

applicationProductsRoute.post("/", verifyToken, createRoute);
applicationProductsRoute.get(
    "/productApplication/search/",
    verifyToken,
    searchRoute
);
applicationProductsRoute.put("/", verifyToken, updateRoute);
applicationProductsRoute.delete("/:id", verifyToken, deleteRoute);
applicationProductsRoute.get("/:id", verifyToken, getRoute);

export default applicationProductsRoute;
