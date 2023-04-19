/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
require("./configs/mongoose");
const cors = require("cors");
const userRouter = require("./controller/user");
const employeeRouter = require("./controller/employee.js")

import { config } from "dotenv";
config();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(employeeRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
