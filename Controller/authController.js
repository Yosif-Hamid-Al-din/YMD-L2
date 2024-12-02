const AuthUser = require("../models/authUser");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");


const authUser_signout_post =  (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/")
  }
  const authUser_welcome_get =   (req, res) => {
    res.render("welcome")
  }
  const authUser_login_get =    (req, res) => {
    res.render("auth/login")
  }
  const authUser_login_post =  async (req, res) => {
    const loginuser = await AuthUser.findOne({ email: req.body.email })
    if (loginuser == null) {
      res.json({notFoundEmail: 'Email not found'})
    } else {
      const match = await bcrypt.compare(req.body.password, loginuser.password);
      if (match) {
        var token = jwt.sign({ id: loginuser._id }, process.env.JWTSECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({id: loginuser._id})
      } else {
        res.json({wrongPassword:  `Wrong password for  ${req.body.email}` })
      }
    }
  }
  const authUser_signup_get = (req, res) => {
    res.render("auth/signup")
  }
  const authUser_signup_post =  async (req, res) => {
    try {
      const objError = validationResult(req);
      if (objError.errors.length > 0) {
        return res.json({ arrValidationError: objError.errors });
      }
  
      const isCurrentEmail = await AuthUser.findOne({email: req.body.email})
      if (isCurrentEmail) {
      return   res.json({ existEmail: "email already exist" });
      }
  
      const newUser = await AuthUser.create(req.body);
      var token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({id: newUser._id})
    } catch (error) {
      console.log(error)
    }
  }
  

  module.exports ={
    authUser_signout_post,
    authUser_welcome_get,
    authUser_login_get,
    authUser_signup_get,
    authUser_signup_post,
    authUser_login_post,
  }