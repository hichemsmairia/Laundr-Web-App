const cryptoRandomString = require("crypto-random-string");

const accountSID =
  process.env.TWILIO_SID || require("../config/config").twilio.accountSID;
const authToken =
  process.env.TWILIO_AUTHTOKEN || require("../config/config").twilio.authToken;
const client = require("twilio")(accountSID, authToken);
const from = process.env.TWILIO_FROM || require("../config/config").twilio.from;

const twilioVerify = (req, res) => {
  let code = cryptoRandomString({ length: 6, type: "numeric" });
  let to = req.body.to;

  client.messages
    .create({
      body:
        "Thanks for signing up! Your Laundr verification code is: " +
        code +
        ".",
      from: from,
      to: to,
    })
    .then(() => {
      //not including twilio's response
      return res.json({
        success: true,
        message: code,
      });
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

module.exports = { twilioVerify };
