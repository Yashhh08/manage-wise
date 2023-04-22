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
    let limit = 0;
    let skip = 0;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip);
    }

    let performances = null;

    if (req.user.role === "admin") {
      performances = await Performance.find().limit(limit).skip(skip);
    } else {
      const employee = await Employee.findOne({ email: req.user.email });

      performances = await Performance.find({ employeeId: employee._id })
        .limit(limit)
        .skip(skip);
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
