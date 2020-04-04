const {
    register,
    checkDuplicate,
    login,
  } = require("../controllers/userController"),
  express = require("express"),
  router = express.Router();

router.post("/register", register);
router.post("/checkDuplicate", checkDuplicate);
router.post("/login", login);

module.exports = router;
