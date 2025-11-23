import express from "express";
import { 
  getAllUsers, 
  getUserById, 
  deleteUser, 
  updateUser 
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// GET single user by ID
router.get("/:id", getUserById);

// UPDATE user by ID
router.put("/:id", updateUser);

// DELETE user by ID
router.delete("/:id", deleteUser);

export default router;