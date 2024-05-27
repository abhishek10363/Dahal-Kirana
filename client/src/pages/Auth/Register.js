import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import OAuth from "../../components/OAuth";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [profilePicture, SetProfilePicture]=useState("")
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // `${process.env.REACT_APP}/api/v1/auth/register
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
       

      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Sign Up - Dahal kirana">
      <div className="form-container " >
        <form onSubmit={handleSubmit}>
          <h4 className="title">Sign UP</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            SignUp
          </button>
          <OAuth/>
        <div className=' mt-3'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
