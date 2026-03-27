import { Router } from "express";
import bcrypt from bcrypt;
import jwt from JsonWebToken;
import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";
const router = Router();
router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        let Model;
        if (role == "student") Model = await initStudentModel();
        else if (role == "teacher") Model = await initTeacherModel();
        else if (role == "staff") Model = await initStaffModel();
        else return res.status(400).json({ succes: false, message: "Invalid role" });
        const user = await Model.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user.id, role },
            "secretKey",
            { expiresIn: "1d" }
        );
        return res.json({
            success: true,  
            token,
            role,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});
export default router;
