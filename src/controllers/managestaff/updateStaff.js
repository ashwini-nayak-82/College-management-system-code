import bcrypt from "bcrypt";
import initStaffModel from "../../models/staffModel.js";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import { Router } from "express";

const router = Router();

const updateStaff = async (req, res) => {
  try {
    
      const { staff_id,name, email } = req.body || {};

    const Staff = await initStaffModel();

    if (!staff_id) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "staff_id"));
    }

    await Staff.update(
      { name, email },
      { where: { id: staff_id } }
    );

    return send(res, RESPONSE.SUCCESS, {}, {});
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, err.message));
  }
};

export default updateStaff;