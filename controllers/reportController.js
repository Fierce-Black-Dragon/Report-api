const Report = require("../models/Report");
const createError = require("http-errors");
//create report
exports.createReport = async (req, res, next) => {
  try {
    // console.log(req.body);
    const {
      userID,
      marketID,
      marketName,
      cmdtyID,
      cmdtyName,
      priceUnit,
      convFctr,
      reportID,
      price,
    } = req.body;

    //if any fields are missing
    if (
      !(
        userID &&
        marketID &&
        marketName &&
        cmdtyID &&
        cmdtyName &&
        priceUnit &&
        convFctr &&
        price
      )
    ) {
      throw createError.BadRequest("all fields  are required");
    }

    const alreadyReport = await Report.find({
      "reports.marketID": marketID,
      "reports.cmdtyID": cmdtyID,
    });

    let updateAlreadyFoundReport;
    if (alreadyReport.length === 0) {
      const newReport = await Report.create({
        reports: req.body,
      });
      res.status(201).json({
        success: true,
        ReportID: newReport?._id,
      });
    } else {
      const id = alreadyReport[0]?._id;

      updateAlreadyFoundReport = await Report.updateOne(
        { _id: id },
        {
          $push: {
            reports: req.body,
          },
        }
      );
      res.status(201).json({
        success: true,
        ReportID: alreadyReport[0]?._id,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.aggregatedReport = async (req, res, next) => {
  try {
    const reportId = req?.query?.reportID;
    console.log(req.query);
    const report = await Report.findById(reportId);
    // console.log(getAggregatedReport(report));
    const r = getAggregatedReport(report);
    res.status(200).json({ Aggregated_Report: r });
  } catch (error) {
    next(error);
  }
};

const getAggregatedReport = (report) => {
  const id = report._id.toString();
  const reports = report.reports;

  var responseReport = reports?.[0].toObject();
  var totalReports = reports.length;
  console.log(id);
  responseReport.userID = undefined;
  responseReport.convFctr = undefined;
  delete responseReport.userID;

  delete responseReport.convFctr;

  responseReport.users = [];
  var price = 0;
  reports.forEach((r) => {
    responseReport.users.push(r.userID);
    price += r.price / r.convFctr;
  });

  responseReport.priceUnit = "Kg";
  responseReport.price = price / totalReports;
  responseReport.timestamp = new Date(responseReport.createdAt).valueOf();
  delete responseReport.createdAt;

  delete responseReport.updatedAt;
  return responseReport;
};
