const Department = require("../db/models/departmentModel");

async function createDefaultDepartment(req, res, next) {
    try {
        const query = {name: "general", instance: req.instance};
        const department = await Department.findOne(query);
        if (!department) {
            const newDepartment = new Department(query)
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