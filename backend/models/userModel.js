const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: Date,
  confirmPassword: {
    type: String,
    required: [
      function () {
        return this.isNew || this.isModified("password");
      },
      "please confirm your password",
    ],
    validate: {
      validator: function (el) {
        // Only validate when password is being set/changed
        if (!this.isModified("password")) return true;
        return el === this.password;
      },
      message: "passwords are not the same!",
    },
  },
  cart: [cartSchema],
});

userSchema.pre("save", async function () {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return;

  // If password isn't selected (select:false) it may be undefined on updates like cart edits
  if (!this.password) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  // Update passwordChangedAt for existing users (not on initial create)
  if (!this.isNew) {
    // Subtract 1s to avoid token issued at same time edge-case
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (!this.passwordChangedAt) return false;
  const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
  return JWTTimestamp < changedTimestamp;
};

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };

module.exports = mongoose.model("User", userSchema);
