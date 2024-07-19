import express from "express";
import { signin } from "../controller/auth.controller.js";
const route = express.Router()

route.post("/signin",signin)

export default route