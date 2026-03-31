import { DataTypes } from "sequelize";
import getConnection from "../helper/dbconnection.js";

let teacher;

export default async function initTeacher() {
  if (teacher) return teacher;

  const sequelize = await getConnection();

  teacher = sequelize.define(
    "teacher",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      role: { type: DataTypes.INTEGER, defaultValue: 2 },
      isactive: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "teachers",      
      freezeTableName: true,
      timestamps: true,
    }
  );

  await teacher.sync({ alter: true }); 

  return teacher;
}