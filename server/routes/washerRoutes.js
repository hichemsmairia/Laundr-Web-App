const { setWasherDone } = require("../controllers/washerController"),
  express = require("express"),
  router = express.Router();

router.post("/setWasherDone", setWasherDone);

module.exports = router;
