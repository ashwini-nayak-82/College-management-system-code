import { DataTypes, UUIDV4 } from "sequelize";
import getConnection from "../helper/dbconnection.js";

let teacher;
export default async function initTeacher() {
  if (teacher) return teacher;
  const sequelize = await getConnection();
  teacher = sequelize.define("teacher", {
    id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: "teacher" },
  });
  await teacher.sync();
  return teacher;
}
