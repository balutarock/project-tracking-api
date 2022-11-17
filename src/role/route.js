import express from "express";
import activitySearch from "../activities/activitySearch";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import getRoleList from "./getRoleList";
import getRoute from "./getRoute";
import searchRoute from "./searchRoute";
import updateRole from "./updateRole";
const verifyToken = require("../../middleware/verifyToken");

const roleRoute = express.Router();

roleRoute.post("/", verifyToken, createRoute);
roleRoute.get("/roles/search/", verifyToken, searchRoute);
roleRoute.get("/", verifyToken, getRoute);
roleRoute.delete("/:id", verifyToken, deleteRoute);
roleRoute.get("/roleList", verifyToken, getRoleList);
roleRoute.put("/", verifyToken, updateRole);
roleRoute.get("/activity/search/", verifyToken, activitySearch);
export default roleRoute;
