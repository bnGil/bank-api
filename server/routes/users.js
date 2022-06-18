import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/usersController.js";

export const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/add", createUser);
router.delete("/delete", deleteUser);
