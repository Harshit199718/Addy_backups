const getDepartmentModel = require("../db/models/departmentModel")

async function createDefaultDepartment(req, res, next) {
    try {
        const Department = getDepartmentModel(req.dbConnection);
        const department = await Department.findOne({name: "general"});
        if (!department) {
            const newDepartment = new Department({
                name: "general"
            })
            await newDepartment.save();
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createDefaultDepartment
}