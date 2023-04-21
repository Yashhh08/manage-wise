const express = require("express");
const Leave = require("../model/leave");
const auth = require("../middleware/auth");
const Employee = require("../model/employee");

const router = new express.Router();

router.post("/leaves", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email });

    const leave = new Leave({ employeeId: employee._id, ...req.body });

    await leave.save();

    res.status(201).send(leave);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/leaves", auth, async (req, res) => {
  try {
    let limit = 0;
    let skip = 0;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip);
    }

    const sort = {};

    if (req.query.sortBy) {
      const split = req.query.sortBy.split(":");

      sort[split[0]] = split[1] === "desc" ? -1 : 1;
    }

    if (req.user.role === "admin") {
      const leaves = await Leave.find()
        .populate({
          path: "employeeId",
          select: ["name", "email", "designation"],
          populate: {
            path: "departmentId",
            select: ["name", "head"],
          },
        })
        .limit(limit)
        .skip(skip)
        .sort(sort);

      if (leaves.length > 0) {
        res.status(200).send(leaves);
      } else {
        res.status(404).send({ error: "No record found..!!" });
      }
    } else {
      const employee = await Employee.findOne({ email: req.user.email });

      const leaves = await Leave.find({ employeeId: employee._id })
        .limit(limit)
        .skip(skip)
        .sort(sort);

      if (leaves.length > 0) {
        res.status(200).send(leaves);
      } else {
        res.status(404).send({ error: "No record found..!!" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/leaves/:id", auth, async (req, res) => {
  try {
    let leave = null;

    const id = req.params.id;

    if (req.user.role === "admin") {
      leave = await Leave.findById(id);
    } else {
      const employee = await Employee.findOne({ email: req.user.email });

      leave = await Leave.findOne({ _id: id, employeeId: employee._id });
    }

    if (leave !== null) {
      res.status(200).send(leave);
    } else {
      res.status(404).send({ error: `Leave with id ${id} not found..!!` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/leaves/:id", auth, async (req, res) => {
  let allowedUpdates = [];
  if (req.user.role === "admin") {
    allowedUpdates = ["status"];
  } else {
    allowedUpdates = ["leaveType", "description", "startDate", "endDate"];
  }
  const requestedUpdates = Object.keys(req.body);
  const isRequestValid = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isRequestValid) {
    return res.status(400).send({ error: "invalid updates..!!" });
  }

  try {
    let leave = null;

    const id = req.params.id;

    if (req.user.role === "admin") {
      leave = await Leave.findById(id);
    } else {
      const employee = await Employee.findOne({ email: req.user.email });

      leave = await Leave.findOne({ _id: id, employeeId: employee._id });
    }

    if (!leave) {
      return res
        .status(404)
        .send({ error: `Leave with id ${id} not found..!!` });
    }

    requestedUpdates.forEach((update) => {
      leave[update] = req.body[update];
    });

    await leave.save();

    res.status(200).send(leave);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/leaves/:id", auth, async (req, res) => {
  try {
    let leave = null;

    const id = req.params.id;

    if (req.user.role === "admin") {
      leave = await Leave.findById(id);
    } else {
      const employee = await Employee.findOne({ email: req.user.email });

      leave = await Leave.findOne({ _id: id, employeeId: employee._id });
    }

    if (!leave) {
      return res
        .status(404)
        .send({ error: `Leave with id ${id} not found..!!` });
    }

    if (leave.status === "approved") {
      return res.status(401).send({
        error:
          "This leave request has already been approved and cannot be modified.",
      });
    }

    await Leave.findByIdAndDelete(id);

    res.status(200).send({ message: `Leave ${id} removed successfully..!!` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
