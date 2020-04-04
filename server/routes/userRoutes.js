const { register, checkDuplicate } = require("../controllers/userController"),
  express = require("express"),
  router = express.Router();

router.post("/register", register);
router.post("/checkDuplicate", checkDuplicate);

module.exports = router;
