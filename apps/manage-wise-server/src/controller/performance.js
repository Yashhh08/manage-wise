const express = require("express");
const Performance = require("../model/performance");
const auth = require("../middleware/auth");
const Employee = require("../model/employee");

const router = new express.Router();

router.post("/performances", auth, async (req, res) => {
  try {
    const reviewer = await Employee.findOne({ email: req.user.email });

    const performance = new Performance({
      reviewer: reviewer.name,
      ...req.body,
    });

    await performance.save();

    res.status(201).send(performance);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/performances", auth, async (req, res) => {
  try {
    let performances = null;

    if (req.user.role === "admin") {
      performances = await Performance.find();
    } else {
      const employee = await Employee.findOne({ email: req.user.email });

      performances = await Performance.find({ employeeId: employee._id });
    }

    if (!performances || performances.length === 0) {
      res.status(404).send({ error: "No record found..!!" });
    } else {
      res.status(200).send(performances);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
