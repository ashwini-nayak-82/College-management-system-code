import { Router } from "express";
import bcrypt from "bcrypt";
import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";
import { send, setErrmsg } from "../helper/responsehelper.js";
import { RESPONSE } from "../constants/global.js";
const router = Router();

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "All fields required"));
    }

    let Model;

    if (role.student === 1) Model = await initStudentModel();
    else if (role.teacher === 2) Model = await initTeacherModel();
    else if (role.staff === 3) Model = await initStaffModel();
    else {
      return send(res, setErrmsg(RESPONSE.INVALID, "Invalid role"));
    }

    const isExist = await Model.findOne({ where: { email } });

    if (isExist) {
      return send(res, setErrmsg(RESPONSE.ERROR, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Model.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return send(res, setErrmsg(RESPONSE.SUCCESS, "Registered Succesfully"));
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, { message: err.message }));
  }
};

export default router;
