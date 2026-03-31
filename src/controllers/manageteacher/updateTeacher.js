import bcrypt from "bcrypt";
import initTeacherModel from "../../models/teacherModel.js";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import { Router } from "express";
const router = Router();
export default router.put("/", async (req, res) => {
  try {
    const { teacher_id, name, email } = req.body || {};;
    const Teacher = await initTeacherModel();

    if (!teacher_id) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "teacher_id"));
    }
    Teacher.update(
      { name: name, email: email },
      {
        where: { id: teacher_id },
      },
    );
    return send(
      res,
      setErrmsg(RESPONSE.SUCCESS, "Teacher updated successfully"),
    );
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, { message: err.message }));
  }
});
