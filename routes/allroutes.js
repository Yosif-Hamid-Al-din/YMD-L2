const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const authController = require('../Controller/authController')
const AuthUser = require('../models/authUser')
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
var {requireAuth} = require("../middleware/middleware");
var {checkifuser} = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");


//l2

router.get("/*",checkifuser)

router.get("/signout", authController.authUser_signout_post);

router.get("/", authController.authUser_welcome_get);

router.get("/login", authController.authUser_login_get);

router.get("/signup", authController.authUser_signup_get);

router.post("/signup", 
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 8 characters with 1 upper case letter and 1 number").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
 ],
 authController.authUser_signup_post
 );

router.post("/login", authController.authUser_login_post);


// l1
// GET Requst
router.get("/home",requireAuth, userController.user_index_get);

router.get("/edit/:id",requireAuth, userController.user_edit_get);

router.get("/view/:id",requireAuth, userController.user_view_get);

// POST Requst
router.post("/search",requireAuth,checkifuser, userController.user_search_post);

// DELETE Request
router.delete("/user/:id",requireAuth, userController.user_delete);
// put request
router.put("/edit/:id",requireAuth, userController.user_edit_put);


module.exports = router