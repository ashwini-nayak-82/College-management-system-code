import studentapi from "./src/controllers/managestudent/studentapihandler.js";
import staffapi from "./src/controllers/managestaff/staffapihandler.js";
import teacherapi from "./src/controllers/manageteacher/teacherapihandler.js";
import { register } from "./src/routes/register.js";
import { login } from "./src/routes/login.js";
export const router = (app) => {
  app.use("/api/student", studentapi);
  app.use("/api/staff", staffapi);
  app.use("/api/teacher", teacherapi);
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
};
