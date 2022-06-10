const express = require("express");
const router = express.Router();
const {
  createReport,
  aggregatedReport,
} = require("../controllers/reportController");
router.route("/reports").post(createReport);
router.route("/reports").get(aggregatedReport);

//exports  routes
module.exports = router;
