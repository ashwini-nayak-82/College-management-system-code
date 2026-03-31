import initStaffModel from "../../models/staffModel.js";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";
import { Router } from "express";
import { ISACTIVE } from "../../constants/constant.js";
const router = Router();
export default router.delete("/", async (req, res) => {
  try {
    const { staff_id } = req.query;

    const Staff = await initStaffModel();

    if (!staff_id) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "staff_id"));
    }

    const deleted = await Staff.update(
      { isactive: ISACTIVE.INACTIVE },
      {
        where: { id: staff_id }
      },
    );

    if (!deleted) {
      return send(res, setErrmsg(RESPONSE.NOT_FOUND, "staff"));
    }

    return send(res, RESPONSE.SUCCESS, {}, {});
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, err.message));
  }
});

