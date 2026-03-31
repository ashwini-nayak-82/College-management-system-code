import initStaffModel from "../../models/staffModel.js";
import { Op } from "sequelize";
import { send } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";

export default async function listStaff(req, res) {
  try {
    const staffModel = await initStaffModel();

    const { searchkey, fromDate, toDate } = req.query;

    const conditions = [];

    if (searchkey) {
      conditions.push({
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchkey}%` } },
          { email: { [Op.iLike]: `%${searchkey}%` } },
        ],
      });
    }

    if (fromDate && toDate) {
      conditions.push({
        createdAt: {
          [Op.between]: [
            new Date(fromDate + " 00:00:00"),
            new Date(toDate + " 23:59:59"),
          ],
        },
      });
    }

    const whereCondition = conditions.length ? { [Op.and]: conditions } : {};

    const staff = await staffModel.findAll({
      where: whereCondition,
    });

    return send(res, RESPONSE.SUCCESS, {
      count: staff.length,
      data: staff,
    });
  } catch (error) {
    console.log("ERROR in listStaff:", error);
    return send(res, RESPONSE.ERROR);
  }
}
