import initTeacherModel from "../../models/teacherModel.js";
import { Op } from "sequelize";
import { send } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";

export default async function listTeacher(req, res) {
  try {
    const teacherModel = await initTeacherModel();

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

    const teachers = await teacherModel.findAll({
      where: whereCondition,
    });

    return send(res, RESPONSE.SUCCESS, {
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.log("ERROR in listTeacher:", error);
    return send(res, RESPONSE.ERROR);
  }
}
