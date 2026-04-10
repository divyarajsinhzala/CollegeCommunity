const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentId: { type: String },
    phone: { type: String },
    department: { type: String },
    branch: { type: String },
    year: { type: String },
    dob: { type: String },
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// FIX: Removed 'next' parameter to prevent "next is not a function"
// When using async/await in Mongoose hooks, you simply return or throw.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;