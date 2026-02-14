const getDepartmentModel = require("../db/models/departmentModel");

const getDepartments = async (req, res, next) => {
  const Department = getDepartmentModel(req.dbConnection);
  try {
    const departments = await Department.find();
    return res.status(200).json({
      status: true,
      data: departments
    })
  } catch (error) {
    next(error);
  }
};
const createDepartment = async (req, res, next) => {
  const Department = getDepartmentModel(req.dbConnection);
  try {
    const { name } = req.body;
    let department = await Department.findOne({ name });
    if (!department) {
      department = new Department({
        name
      });
      await department.save();
    }
    return res.status(200).json({
      status: true,
      data: department
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDepartment,
  getDepartments
};
