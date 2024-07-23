import express from "express";
import * as couponController from "./coupon.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
const couponRouter = express.Router();

couponRouter
  .route("/")
  .get(couponController.getAllCoupon)
  .post(protectRoutes,couponController.addCoupon);
  couponRouter
  .route("/:_id")
  .get(couponController.getCouponById)
  .put(protectRoutes,couponController.updateCoupon)
  .delete(couponController.deleteCoupon);
export default couponRouter;
