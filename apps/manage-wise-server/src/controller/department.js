const express = require("express");
const Department = require("../model/department");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/departments", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const department = new Department(req.body);

    await department.save();

    res.status(201).send(department);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/departments", auth, async (req, res) => {
  try {
    let limit = 0;
    let skip = 0;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip);
    }

    const department = await Department.find().limit(limit).skip(skip);

    if (department.length > 0) {
      res.status(200).send(department);
    } else {
      res.status(404).send({ error: `No record found..!!` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/departments/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const department = await Department.findById(id);

    if (!department) {
      return res
        .status(404)
        .send({ error: `No department found with id ${id}` });
    }

    res.status(200).send(department);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/departments/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({ error: "unAuthorized..!!" });
  }

  const allowedUpdates = ["name", "head"];
  const requestedUpdates = Object.keys(req.body);
  const isRequestValid = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isRequestValid) {
    return res.status(400).send({ error: "invalid updates..!!" });
  }

  try {
    const id = req.params.id;

    const department = await Department.findById(id);

    if (!department) {
      return res
        .status(404)
        .send({ error: `No department found with id ${id}` });
    }

    requestedUpdates.forEach((update) => {
      department[update] = req.body[update];
    });

    await department.save();

    res.status(200).send(department);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/departments/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const id = req.params.id;

    const department = await Department.findById(id);

    if (!department) {
      return res
        .status(404)
        .send({ error: `No department found with id ${id}` });
    }

    await Department.findByIdAndDelete(id);

    res.status(200).send({
      message: `Department ${department.name} removed successfully..!!`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
