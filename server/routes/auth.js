const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Random@TokenSecret12324567899";

// ROUTE 1 : Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isLength({ min: 3 }).withMessage("Please enter a Valid name"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ success, msg: "Email already exists" }] });
      }

      // encrpt the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      await user.save();

      // res.status(201).json(user);

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true

      // res.json({success, token: authToken});
      res.json({ success, authToken, user: { name: user.name } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ROUTE 2 : Login a user using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    // middlware to valid email.
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure
    const { email, password } = req.body;
    try {
      // if email does not exist.
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            errors: [
              {
                msg: "Invalid Credentials, Please try to login with correct credentials",
              },
            ],
          });
      }
      // compare password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({
            errors: [
              {
                success, msg: "Invalid Credentials, Please try to login with correct credentials",
              },
            ],
          });
      }

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      // res.json({ success, authToken: authToken });
      res.json({ success, authToken, user: { name: user.name } });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ROUTE 3 : Get logged in user details "/api/auth/getuser". Login required
router.post(
  "/getuser", fetchuser, 
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error.message" });
    }
  }
);

module.exports = router;
