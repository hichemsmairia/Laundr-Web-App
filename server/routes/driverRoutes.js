const { assignOrder } = require("../controllers/driverController"),
  express = require("express"),
  router = express.Router();

router.post("/assignOrder", assignOrder);

module.exports = router;
