const {
    placeOrder,
    getOrders,
    getCurrentOrder,
  } = require("../controllers/orderController"),
  express = require("express"),
  router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/getOrders", getOrders);
router.post("/getCurrentOrder", getCurrentOrder);

module.exports = router;
