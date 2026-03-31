import initStudentModel from "../../models/studentModel.js";
import { Op } from "sequelize";
import { send } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../constants/global.js";

export default async function listStudent(req, res) {
  try {
    const studentModel = await initStudentModel();

    const { searchkey, fromDate, toDate } = req.query;

    let conditions = [];

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
            new Date(fromDate), 
            new Date(toDate + "T23:59:59.999Z"), 
          ],
        },
      });
    }

    let whereCondition = {};
    if (conditions.length > 0) {
      whereCondition = {
        [Op.and]: conditions,
      };
    }

    const students = await studentModel.findAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]], 
    });

    return send(res, RESPONSE.SUCCESS, {
      count: students.length,
      data: students,
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return send(res, RESPONSE.ERROR);
  }
}