//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: "" //place the uri of your mongoDB database here
  },
  twilio: {
    accountSID: "", //place your twilio SID here
    authToken: "", //place your twilio authToken here
    from: "" //place your twilio phone number here, starting with +1
  }
};
