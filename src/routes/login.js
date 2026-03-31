import { send, setErrmsg } from "../helper/responsehelper.js";
import { RESPONSE } from "../constants/global.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import initStudentModel from "../models/studentModel.js";
import initTeacherModel from "../models/teacherModel.js";
import initStaffModel from "../models/staffModel.js";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "Email"));
    }

    if (!password) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "password"));
    }

    if (!role) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "role"));
    }

    let Model;

    if (role.student === 1) Model = await initStudentModel();
    else if (role.teacher=== 2) Model = await initTeacherModel();
    else if (role.staff === 3) Model = await initStaffModel();
    else {
      return send(res, setErrmsg(RESPONSE.INVALID, "role"));
    }

    const userData = await Model.findOne({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return send(res, setErrmsg(RESPONSE.INVALID, "credentials"));









































    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return send(res, setErrmsg(RESPONSE.INVALID, "credentials"));
    }

    const token = jwt.sign(
      {
        id: userData.id,
        role: role,
      },
      "secretKey",
      { expiresIn: "1d" },
    );

   return res.status(200).json({
  responseCode: 200,
  responseMessage: "Login successful",
  responseData: {
    token
  }
});
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return send(res, setErrmsg(RESPONSE.ERROR));
  }
};
