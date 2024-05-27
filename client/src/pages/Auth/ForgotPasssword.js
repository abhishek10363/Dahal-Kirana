import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Layout from "./../../components/Layout/Layout";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/auth/generate-otp", { email });
      if (data.message === "OTP sent to your email") {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Please enter all the fields");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (data.message === "Password reset successfully") {
        toast.success("Password reset successfully");
        navigate("/login"); // Navigate to login page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Layout title="Forgot Password - Dahal-Kirana">
      <div className="form-container">
        <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
          <div className="container">
            <h4 className="title">Forgot Password</h4>
            {!otpSent ? (
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-3"
                />
                <button
                  onClick={handleSendOtp}
                  className="btn btn-outline-danger mb-3"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-control mb-3"
                />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control mb-3"
                />
                <button
                  onClick={handleResetPassword}
                  className="btn btn-outline-danger"
                  disabled={loading}
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
