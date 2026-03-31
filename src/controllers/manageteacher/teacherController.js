import initTeacherModel from "../../models/teacherModel.js";
import bcrypt from "bcryptjs";

export const addTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const Teacher = await initTeacherModel();

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashed,
      role: "teacher"
    });

    res.json(teacher);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  