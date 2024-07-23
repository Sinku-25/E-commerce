import express from "express";
import * as userController from "./controller/user.controller.js";
const userRouter = express.Router();

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);
userRouter
  .route("/:_id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.patch("/changepassword/:_id", userController.changePassword);
export default userRouter;
