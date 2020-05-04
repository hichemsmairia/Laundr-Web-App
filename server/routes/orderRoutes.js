const { placeOrder } = require("../controllers/orderController"),
  express = require("express"),
  router = express.Router();

router.post("/placeOrder", placeOrder);

module.exports = router;
