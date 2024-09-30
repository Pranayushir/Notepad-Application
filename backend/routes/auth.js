const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const secret = "India won world cup after 11 years";
// Router 1: create user using post method : "api/auth/createuser".No login required
router.post("/createuser",
  [
    body("email", "enter the valid email").isEmail(),
    body("password", "enter password of minimum 5 characters").isLength({min: 5,}),
    body("name", "enter name of min 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //validation using express-validator
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({"success":success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({"success":success, errors: "user with email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      //user creation
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user : {
          id : user.id
        }
      }
      success = true;
      const authtoken = jwt.sign(data, secret);
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occured!!!");
    }
  }
);

// Router 2:  authenticate user using post method : "api/auth/login".No login required
router.post("/login",
  [
    body("email", "enter the valid email").isEmail(),
    body("password", "enter password").exists()
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "success":success,errors: errors.array() });
    }

    const{email,password} = req.body;


    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({ "success":success,errors: "Please enter correct credentials!!" });
      }
      const passwordCompare = await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        return res.status(400).json({ "success":success,errors: "Please enter correct credentials!!" });
      }
      success = true;
      const data = {
        user : {
          id : user.id
        }
      }
      const authtoken = jwt.sign(data, secret);
      res.json({success,authtoken});
    }
    catch (error) {
      console.log(error);
      res.status(500).send("Internal error occured!!!");
    }
  })
// Router 3:  get  user details using auth id method : "api/auth/getuser". login required
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error occured!!!");
  }
})
module.exports = router;
