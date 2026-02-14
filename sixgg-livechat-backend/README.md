// Step 1: Find all old general departments and their IDs
var oldGeneralDepartments = db.departments.find({ name: "general" }).toArray();
var oldGeneralDepartmentIds = oldGeneralDepartments.map(d => d._id);
print("Old general departments found:");
printjson(oldGeneralDepartments);
// Step 2: Find all unique instances from users
var uniqueInstances = db.users.distinct("instance");
print("Unique instances found:");
printjson(uniqueInstances);
// Step 3: Create new general departments for each instance
var newGeneralDepartments = {};
uniqueInstances.forEach(function(instance) {
    var newDepartment = db.departments.insertOne({ name: "general", instance: instance, createdAt: new Date(), updatedAt: new Date() });
    newGeneralDepartments[instance] = newDepartment.insertedId;
});
print("New general departments created:");
printjson(newGeneralDepartments);
// Step 4a: Remove old general departments from users
uniqueInstances.forEach(function(instance) {
    db.users.updateMany(
        { instance: instance, departments: { $in: oldGeneralDepartmentIds } },
        { $pull: { departments: { $in: oldGeneralDepartmentIds } } }
    );
});
print("Old general departments removed from users.");
// Step 4b: Add new general departments to users
uniqueInstances.forEach(function(instance) {
    var newDepartmentId = newGeneralDepartments[instance];
    db.users.updateMany(
        { instance: instance },
        { $addToSet: { departments: newDepartmentId } }
    );
});
print("Users updated with new general departments.");
// Step 5: Delete all old general departments
db.departments.deleteMany({ _id: { $in: oldGeneralDepartmentIds } });
print("Old general departments deleted.");
