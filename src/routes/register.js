import { Router } from "express";
import bcrypt from "bcrypt";
import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    let Model;

    if (role === "student") {
      Model = await initStudentModel();
    } else if (role === "teacher") {
      Model = await initTeacherModel();
    } else if (role === "staff") {
      Model = await initStaffModel();
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const isExist = await Model.findOne({ where: { email } });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Model.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.json({
      success: true,
      message: "Registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;