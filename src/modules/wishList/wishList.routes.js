import express from "express";
import * as wishListController from "./wishList.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
const wishListRouter = express.Router();

wishListRouter.patch("/",protectRoutes,wishListController.addToWishList)
wishListRouter.delete("/",protectRoutes,wishListController.removeFromWishList)
wishListRouter.get("/",protectRoutes,wishListController.getAllWishList)


export default wishListRouter;
