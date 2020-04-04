const { twilioVerify } = require("../controllers/twilioController"),
  express = require("express"),
  router = express.Router();

router.post("/verifyPhone", twilioVerify);

module.exports = router;
