import express from "express";
import * as cartController from "./cart.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
const cartRouter = express.Router();

cartRouter.route("/").post(protectRoutes,cartController.creatCart).get(protectRoutes,cartController.getAllCart)
cartRouter.route("/:_id").delete(protectRoutes,cartController.removeCartItem).put(protectRoutes,cartController.updateCart)
cartRouter.route("/apply-coupon").post(protectRoutes,cartController.applyCoupon)
export default cartRouter;
