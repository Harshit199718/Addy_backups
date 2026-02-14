const Department = require("../db/models/departmentModel");

const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({instance: req.instance});
    return res.status(200).json({
      status: true,
      data: departments
    })
  } catch (error) {
    next(error);
  }
};
const createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    let department = await Department.findOne({ name, instance: req.instance });
    if (!department) {
      department = new Department({
        name,
        instance: req.instance
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
