import { DataTypes } from "sequelize";
import getConnection from "../helper/dbconnection.js";

let student;
export default async function initStudent() {
  if (student) return student;
  const sequelize = await getConnection();
  student = sequelize.define("student", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
    isactive: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
    {
      tableName: "teachers",      
      freezeTableName: true,
      timestamps: true,
    
  });
  await student.sync({ alter: true });
  return student;
}
