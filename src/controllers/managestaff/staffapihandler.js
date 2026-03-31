import { Router } from "express";
import updateStaff from "./updateStaff.js";
import liststaff from "./listStaff.js";
import deletestaff from "./deleteStaff.js";
import createstaff from "./createStaff.js";
let route = Router();

route.use("/update", updateStaff);
route.use("/list", liststaff);
route.use("/delete", deletestaff);
route.use("/create", createstaff);
export default route;
