import bcrypt from "bcrypt";
import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";
import { send, setErrmsg } from "../helper/responsehelper.js";
import { RESPONSE } from "../constants/global.js";

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return send(res,setErrmsg(RESPONSE.REQUIRED, "oldPassword & newPassword"),
      );
    }

    if (!req.user || !req.user.id || !req.user.role) {
      return send(res, setErrmsg(RESPONSE.ERROR, "Unauthorized"));
    }

    const { id, role } = req.user;

    let Model;

    switch (role) {
      case "student":
        Model = await initStudentModel();
        break;
      case "teacher":
        Model = await initTeacherModel();
        break;
      case "staff":
        Model = await initStaffModel();
        break;
      default:
        return send(res, setErrmsg(RESPONSE.INVALID, "Invalid role"));
    }

    const user = await Model.findOne({ where: { id } });

    if (!user) {
      return send(res, setErrmsg(RESPONSE.NOT_FOUND, "User"));
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return send(res, setErrmsg(RESPONSE.INVALID, "Old password"));
    }

    if (oldPassword === newPassword) {
      return send(
        res,
        setErrmsg(RESPONSE.INVALID, "New password must be different"),
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    return send(
      res,
      setErrmsg(RESPONSE.SUCCESS, "Password updated successfully"),
    );
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, { message: err.message }));
  }
};
