import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize = null;

const getConnection = async () => {
  try {
    if (sequelize) return sequelize;

    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false,
      }
    );

    await sequelize.authenticate();
    console.log("Database connected successfully");

    return sequelize;
  } catch (err) {
    console.log("Database connection error:", err.message);
    process.exit(1);
  }
};

export default getConnection;