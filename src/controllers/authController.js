import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let Model;

    if (role === "student") Model = await initStudentModel();
    else if (role === "teacher") Model = await initTeacherModel();
    else if (role === "staff") Model = await initStaffModel();
    else return res.status(400).json({ message: "Invalid role" });

    const exist = await Model.findOne({ where: { email } });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await Model.create({
      name,
      email,
      password: hashed,
      role
    });

    res.json({ message: "Registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let Model;

    if (role === "student") Model = await initStudentModel();
    else if (role === "teacher") Model = await initTeacherModel();
    else if (role === "staff") Model = await initStaffModel();
    else return res.status(400).json({ message: "Invalid role" });

    const user = await Model.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_secret_key",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};