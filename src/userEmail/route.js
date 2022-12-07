import express from "express";
import getEmailList from "./getEmailList";
const verifyToken = require("../../middleware/verifyToken");

const userEmailRoute = express.Router();

userEmailRoute.get("/list", verifyToken, getEmailList);

export default userEmailRoute;
