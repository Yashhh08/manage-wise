const express = require("express");
const Employee = require("../model/employee");
const auth = require("../middleware/auth");
const Department = require("../model/department");

const router = new express.Router();

router.post("/employees", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const employee = new Employee(req.body);

    await employee.save();

    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/employees", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    let limit = 0;
    let skip = 0;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip);
    }

    const employees = await Employee.find().limit(limit).skip(skip);

    if (employees.length > 0) {
      res.status(200).send(employees);
    } else {
      res.status(404).send({ message: "No Employees Found..!!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/employees/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const id = req.params.id;

    const employee = await Employee.findById(id);

    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send({ message: `No employee found with id ${id}` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/employees/department/:departmentId", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const departmentId = req.params.departmentId;

    const department = await Department.findById(departmentId);

    const employees = await Employee.find({ departmentId: departmentId });

    if (employees.length > 0) {
      res.status(200).send(employees);
    } else {
      res.status(404).send({
        message: `No employees found from ${department.name} department`,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/employees/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({ error: "unAuthorized..!!" });
  }

  const allowedUpdates = [
    "name",
    "email",
    "address",
    "phone",
    "designation",
    "departmentId",
    "hireDate",
    "salary",
  ];
  const requestedUpdates = Object.keys(req.body);
  const isRequestValid = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isRequestValid) {
    return res.status(400).send({ error: "invalid updates..!!" });
  }

  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .send({ message: `No employee found with id ${id}` });
    }

    requestedUpdates.forEach((update) => {
      employee[update] = req.body[update];
    });

    await employee.save();

    res.status(200).send(employee);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/employees/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .send({ message: `No employee found with id ${id}` });
    }

    await Employee.findByIdAndDelete(id);

    res
      .status(200)
      .send({ message: `Employee ${employee.name} removed successfully..!!` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
