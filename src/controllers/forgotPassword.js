import bcrypt from "bcrypt";
import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";
import { send, setErrmsg } from "../helper/responsehelper.js";
import { RESPONSE } from "../constants/global.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email, role, newPassword } = req.body;

    if (!email || !role || !newPassword) {
      return send(
        res, setErrmsg(RESPONSE.REQUIRED, "email, role & newPassword"));
    }

    let Model;

    if (role === "student") Model = await initStudentModel();
    else if (role === "teacher") Model = await initTeacherModel();
    else if (role === "staff") Model = await initStaffModel();
    else {
      return send(res, setErrmsg(RESPONSE.INVALID, "role"));
    }

    const user = await Model.findOne({ where: { email } });

    if (!user) {
      return send(res, setErrmsg(RESPONSE.NOT_FOUND, "User"));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    return send(
      res,
      setErrmsg(RESPONSE.SUCCESS, "Password reset successfully")
    );

  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, { message: err.message }));
  }
};