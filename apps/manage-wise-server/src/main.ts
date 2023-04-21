/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
require("./configs/mongoose");
const cors = require("cors");
const userRouter = require("./controller/user");
const employeeRouter = require("./controller/employee.js");
const attendanceRouter = require("./controller/attendance.js");
const departmentRouter = require("./controller/department.js");
const leaveRouter = require("./controller/leave.js");
const performanceRouter = require("./controller/performance.js")

import { config } from "dotenv";
config();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(employeeRouter);
app.use(attendanceRouter);
app.use(departmentRouter);
app.use(leaveRouter);
app.use(performanceRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
