const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, ""],
    },

    marketID: {
      type: String,
      required: true,
    },
    marketName: {
      type: String,
      required: [true, "please provide market name"],
    },

    cmdtyID: {
      type: String,
      required: [true, "please provide market name"],
    },
    cmdtyName: {
      type: String,
      required: [true, "please provide market name"],
    },
    priceUnit: {
      type: String,
      required: [true, "please provide market name"],
    },

    convFctr: {
      type: Number,
      default: 0,
      required: true,
    },

    price: {
      type: Number,
      required: [true, "please add a number in stock"],
    },
  },
  {
    timestamps: true,
  }
);

const ReportDSchema = new mongoose.Schema(
  {
    reports: [reportSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReportD", ReportDSchema);
