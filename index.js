import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);

app.listen(3000, () => {
  console.log("server running on 3000");
});