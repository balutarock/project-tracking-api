import express from "express";
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import forgotPassword from "./forgotPassword";
import getRoute from "./getRoute";
import getUserByToken from "./getUserByToken";
import login from "./login";
import resetPassword from "./resetPassword";
import searchRoute from "./searchRoute";
import sigUpUpdate from "./signUpUpdate";
import updateRoute from "./updateRoute";
const verifyToken = require("../../middleware/verifyToken");

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/", verifyToken, createRoute);
userRoute.get("/:id", verifyToken, getRoute);
userRoute.get("/", verifyToken, getRoute);
userRoute.put("/update", verifyToken, updateRoute);
userRoute.put("/", sigUpUpdate);
userRoute.get("/users/search", verifyToken, searchRoute);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/resetPassword", resetPassword);
userRoute.delete("/:id", verifyToken, deleteRoute);
userRoute.get("/:token", getUserByToken);

export default userRoute;
