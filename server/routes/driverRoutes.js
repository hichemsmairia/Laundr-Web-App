const {
    assignOrderPickup,
    updateOrderWeight,
    setWasherDelivered,
    assignOrderDropoff,
    setUserDelivered,
  } = require("../controllers/driverController"),
  express = require("express"),
  router = express.Router();

router.post("/assignOrderPickup", assignOrderPickup);
router.post("/updateOrderWeight", updateOrderWeight);
router.post("/setWasherDelivered", setWasherDelivered);
router.post("/assignOrderDropoff", assignOrderDropoff);
router.post("/setUserDelivered", setUserDelivered);

module.exports = router;
