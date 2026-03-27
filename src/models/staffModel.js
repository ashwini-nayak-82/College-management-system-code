import { DataTypes, UUIDV4 } from "sequelize";
import getConnection from "../helper/dbconnection.js";

let staff;
export default async function initStaff() {
    if (staff) return staff;
    const sequelize = await getConnection();
    staff = sequelize.define("staff", {
        id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: false },
        password: DataTypes.STRING,
        role: { type: DataTypes.STRING, defaultValue: "staff" }
    });
    await staff.sync();
    return staff;
}