const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    leaveType: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
