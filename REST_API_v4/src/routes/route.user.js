const {Router} = require("express");
const {registerValidation, loginValidation, 
    updateValidation, resetPassValidation} = require("../middlewares/reqvalidation");
const {tokenVerify, isAdmin, isUser} = require("../middlewares/userValidation");
const controller = require("../controllers/controller.user");
const route = Router();

route.post("/register", registerValidation, controller.registerUser);

route.post("/login/", loginValidation, controller.loginUser);

route.get("/profile", tokenVerify, controller.getProfile);

route.patch("/update", tokenVerify, updateValidation, controller.updateProfile);

route.patch("/forgotpassword", controller.forgotPassword);

route.patch("/resetpassword", tokenVerify, resetPassValidation, controller.resetPassword);

route.get("/logout", tokenVerify, controller.userLogout);

route.patch("/delete", tokenVerify, isAdmin, controller.deleteUser);

route.get("/send-email", tokenVerify, controller.sendMail);

route.post("/otp-verify", tokenVerify, controller.verifyOtp);

module.exports = route;

