const { placeOrder, getOrders } = require("../controllers/orderController"),
  express = require("express"),
  router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/getOrders", getOrders);

module.exports = router;
