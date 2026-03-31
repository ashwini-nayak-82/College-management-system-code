import { Router } from "express";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import initstudentModel from "../../models/studentModel.js";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || role === undefined) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "All fields are required"));
    }

    const studentModel = await initstudentModel();

    const isExist = await studentModel.findOne({ where: { email } });
    if (isExist) {
      return send(res, setErrmsg(RESPONSE.ERROR, "Student already exists"));
    }

    const result = await studentModel.create({
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
