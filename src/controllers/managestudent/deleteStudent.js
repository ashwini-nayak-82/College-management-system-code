import initStudentModel from "../../models/studentModel.js";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import { Router } from "express";
import { ISACTIVE } from "../../constants/constant.js";
const router = Router();
export default router.put("/", async (req, res) => {
  try {
    const { student_id } = req.query;

    const Student = await initStudentModel();

    if (!student_id) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "student_id"));
    }

    const deleted = await Student.update(
      { isactive: ISACTIVE.INACTIVE },
      {
        where: { id: student_id },
      },
    );

    if (!deleted) {
      return send(res, setErrmsg(RESPONSE.NOT_FOUND, "student"));
    }

    return send(res, RESPONSE.SUCCESS, {}, {});
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, err.message));
  }
});
