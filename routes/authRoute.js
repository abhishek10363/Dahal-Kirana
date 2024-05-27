import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  deletAccountController,
  googleAuthController ,
  generateOtpController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);
//Google || Post
router.post('/google', googleAuthController);

//Forgot Password || POST
// router.post("/forgot-password", forgotPasswordController);
// genetate otp || Post
router.post('/generate-otp', generateOtpController);
// reset password || POST
router.post('/reset-password', forgotPasswordController);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);
//delete account
router.delete('/delete-account/:userId', requireSignIn, deletAccountController);

export default router;
