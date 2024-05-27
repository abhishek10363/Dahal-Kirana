import express from "express";
import { getAllUsersController, deleteUserController } from "../controllers/getAllUsersController.js"; // adjust the path as necessary

const router = express.Router();

router.get("/users", getAllUsersController);
router.delete("/users/:id", deleteUserController);

export default router;
