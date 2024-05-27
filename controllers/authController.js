import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import otpModel from "../models/otpModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
  
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
// Generate OTP
export const generateOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const otp = crypto.randomInt(1000, 9999).toString(); // Generate a 4-digit OTP
    await otpModel.create({ email, otp });

    await sendEmail(email, 'Password Reset OTP', `Your OTP is ${otp}`);

    res.status(200).send({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};


// Verify OTP and reset password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpRecord = await otpModel.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).send({ message: 'Invalid OTP or expired' });
    }

    const hashedPassword = await hashPassword(newPassword);
    await userModel.findOneAndUpdate({ email }, { password: hashedPassword });
    await otpModel.deleteOne({ email, otp });

    res.status(200).send({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, profilePicture } = req.body;
    const updateData = { name, profilePicture };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );
    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

// Delete user account
export const deletAccountController = async (req, res) => {
  try {
    const { userId } = req.params;
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};

// google
export const googleAuthController = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      // Generate JWT token
      const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.status(200).send({ user, token });
    }

    // Create a new user
    user = new userModel({
      name,
      email,
      profilePicture, 
    });

    await user.save();

    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Google authentication",
      error,
    });
  }
};

