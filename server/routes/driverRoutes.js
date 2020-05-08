const {
    assignOrder,
    updateOrderWeight,
  } = require("../controllers/driverController"),
  express = require("express"),
  router = express.Router();

router.post("/assignOrder", assignOrder);
router.post("/updateOrderWeight", updateOrderWeight);

module.exports = router;
