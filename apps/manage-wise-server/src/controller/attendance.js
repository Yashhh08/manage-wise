const express = require("express");
const Attendance = require("../model/attendance");
const auth = require("../middleware/auth");
const Employee = require("../model/employee");

const router = new express.Router();

router.post("/attendances", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const employee = await Employee.findById(req.body.employeeId);

    if (!employee) {
      return res
        .status(404)
        .send({ error: `No employee found with id${req.body.employeeId}` });
    }

    const attendance = new Attendance(req.body);

    await attendance.save();

    res.status(201).send({ employee, attendance });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/attendances", auth, async (req, res) => {
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

    const attendances = await Attendance.find()
      .populate("employeeId")
      .limit(limit)
      .skip(skip);

    if (attendances.length > 0) {
      res.status(200).send(attendances);
    } else {
      res.status(404).send({ error: "No record found..!!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/attendances/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const id = req.params.id;

    const attendance = await Attendance.findById(id).populate("employeeId");

    if (!attendance) {
      return res.status(404).send({ error: `No record found with id ${id}` });
    }

    res.status(200).send(attendance);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/attendances/employee/:employeeId", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const employeeId = req.params.employeeId;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res
        .status(404)
        .send({ error: `No employee found with id${req.body.employeeId}` });
    }

    let limit = 0;
    let skip = 0;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip);
    }

    const attendance = await Attendance.find({ employeeId: employeeId })
      .limit(limit)
      .skip(skip);

    res.status(200).send(attendance);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/attendances/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({ error: "unAuthorized..!!" });
  }

  const allowedUpdates = ["employeeId", "date", "inTime", "outTime", "status"];
  const requestedUpdates = Object.keys(req.body);
  const isRequestValid = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isRequestValid) {
    return res.status(400).send({ error: "invalid updates..!!" });
  }

  try {
    const id = req.params.id;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).send({ error: `No record found with id ${id}` });
    }

    requestedUpdates.forEach((update) => {
      attendance[update] = req.body[update];
    });

    await attendance.save();

    res.status(200).send(attendance);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/attendances/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const id = req.params.id;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).send({ error: `No record found with id ${id}` });
    }

    await Attendance.findByIdAndDelete(id);

    res.status(200).send({
      message: `Attendance record with id ${id} removed successfully..!!`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
