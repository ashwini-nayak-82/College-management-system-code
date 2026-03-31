import initStaffModel from "../../models/staffModel.js";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";

export const updateStaff = async (req, res) => {
  try {
    const { staff_id } = req.query;
    const { name, email } = req.body;

    const Staff = await initStaffModel();

    if (!staff_id) {
      return send(res, setErrmsg(RESPONSE.REQUIRED, "staff_id"));
    }

    await Staff.update(
      { name, email },
      {
        where: { id: staff_id },
      }
    );

    return send(res, RESPONSE.SUCCESS, {}, {});
  } catch (err) {
    console.error("UPDATE STAFF ERROR:", err);
    return send(res, setErrmsg(RESPONSE.ERROR, err.message));
  }
};