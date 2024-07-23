import express from "express";
import * as orderController from "./order.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
const orderRouter = express.Router();

orderRouter.route("/:_id").post(protectRoutes,orderController.creatOrder)
orderRouter.route("/checkout/:_id").post(protectRoutes,orderController.onlinePayment)
orderRouter.route("/").get(protectRoutes,orderController.getOrder)
export default orderRouter;
