import { Router } from "express";
import { addTeacher } from "../controllers/teacherController.js";
import { authMiddleware, allowOnlyStaff } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add", authMiddleware, allowOnlyStaff, addTeacher);

export default router;