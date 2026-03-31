import bcrypt from "bcrypt";
import initStudentModel from "../../models/studentModel.js";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import { Router } from "express";
const router = Router();
export default router.put("/", async (req, res) => {
  try {
    const { student_id } = req.query;
    const { name, email } = req.body;
    const Student = await initStudentModel();

    if (!student_id) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "student_id"));
    }
    Student.update(
      { name: name, email: email },
      {
        where: { id: student_id },
      },
    );
    return send(
      res,
      setErrmsg(RESPONSE.SUCCESS, "Student updated successfully"),
    );
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, { message: err.message }));
  }
});
