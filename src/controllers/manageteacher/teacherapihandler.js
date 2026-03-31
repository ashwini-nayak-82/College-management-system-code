import { Router } from "express";
import updateTeacher from "./updateTeacher.js";
import listteacher from "./listTeacher.js";
import deleteteacher from "./deleteTeacher.js";
let route = Router();

route.use("/update", updateTeacher);
route.use("/list", listteacher);
route.use("/delete", deleteteacher);

export default route;
