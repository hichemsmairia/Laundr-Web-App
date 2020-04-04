const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  fname: {
    type: String,
    unique: false,
    required: true
  },
  lname: {
    type: String,
    unique: false,
    required: true
  },
  city: {
    type: String,
    unique: false,
    required: true
  },
  phone: {
    type: String,
    unique: false,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  usedReferral: {
    type: String,
    required: false,
    unique: false
  }
});

//the following password methods need to be before "const User..."
//adds method to user to create hashed password
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

//adds method to user to check if password is correct
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//had to add this, checks if password was changed before saving
//before user saved in db
UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this.generateHash(this.password);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
