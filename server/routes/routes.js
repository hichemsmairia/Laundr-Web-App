const { twilioVerify } = require("../controllers/twilio.js"),
  express = require("express"),
  router = express.Router();

router.post("/verifyPhone", twilioVerify);

module.exports = router;
