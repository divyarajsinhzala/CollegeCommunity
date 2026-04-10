const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // If this pulls an empty secret, the signature will be invalid
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;