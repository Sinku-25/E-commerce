import express from "express";
import * as adressController from "./adress.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
const adressRouter = express.Router();

adressRouter.patch("/",protectRoutes,adressController.addAdress)
adressRouter.delete("/",protectRoutes,adressController.removeAdress)
adressRouter.get("/",protectRoutes,adressController.getAllAdresses)


export default adressRouter;
