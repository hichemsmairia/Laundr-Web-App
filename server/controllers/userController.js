const User = require("../models/User");
const signToken = require("../authHelpers").signToken;

const checkDuplicate = async (req, res) => {
  let email = req.body.email.toLowerCase();
  let phone = req.body.phone;
  let emailDupe = false;
  let phoneDupe = false;

  await User.findOne({ email: email })
    .then((user) => {
      if (user) {
        emailDupe = true;
      }
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });

  await User.findOne({ phone: phone })
    .then((user) => {
      if (user) {
        phoneDupe = true;
      }
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });

  //0: none, 1: email, 2: phone, 3: both
  if (emailDupe && phoneDupe) {
    return res.json({ success: true, message: 3 });
  } else if (emailDupe) {
    return res.json({ success: true, message: 1 });
  } else if (phoneDupe) {
    return res.json({ success: true, message: 2 });
  } else {
    return res.json({ success: true, message: 0 });
  }
};

const register = (req, res) => {
  User.create({
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    city: req.body.city,
    phone: req.body.phone,
    password: req.body.password,
    usedReferral: req.body.referral,
    isWasher: false,
    isDriver: false,
    isAdmin: false,
  })
    .then((user) => {
      if (user) {
        return res.json({
          success: true,
          message: "User successfully created",
        });
      } else {
        return res.json({ success: true, message: "Error with creating user" });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (!user || !user.validPassword(req.body.password)) {
        return res.json({
          success: false,
          message: "Invalid login credentials",
        });
      }

      //granting access to the token, the information for current user
      const token = await signToken(user);
      res.json({
        success: true,
        message: "Successfully logged in, token is attached",
        token: token,
      });
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });
};

module.exports = { checkDuplicate, register, login };
