import express from "express";
const router = express.Router();

import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import initStaffModel from "../../models/staffModel.js";

router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || role === undefined) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "All fields are required"));
    }

    const staffModel = await initStaffModel();


    const isExist = await staffModel.findOne({ where: { email } });

    if (isExist) {
      return send(res, setErrmsg(RESPONSE.ERROR, "Staff already exists"));
    }

    const result = await staffModel.create({
      name,
      email,
      password,
      role,
    });

    return send(res, RESPONSE.SUCCESS);

  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, err.message));
  }
});

export default router;  