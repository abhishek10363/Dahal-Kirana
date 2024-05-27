import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { FaUserTimes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const fileRef = useRef(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
 
  const navigate =useNavigate()

  useEffect(() => {
    const { email, name, profilePicture } = auth?.user;
    setName(name);
    setEmail(email);
    setProfilePicture(profilePicture);
  }, [auth?.user]);

  const handleFileUpload = async (image) => {
    const storageRef = ref(storage, `profilePictures/${auth.user._id}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfilePicture(downloadURL);
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        profilePicture
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-account/${auth?.user._id}`);
      if (data.success) {
        toast.success("Account deleted successfully");
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSignOut = () => {
   try {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("Logged out successfully");
   } catch (error) {
    console.log(error)
    toast.error("something went wrong")
   }
  };

  return (
    <div className="container-fluid m-11 p-6 text-center ">
      <div className="row text-centre">
        <div className=" flex col-md-3">
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}
          className="p-4 p-md-3 border rounded-3 bg-light">
            <h4 className="title">USER PROFILE</h4>
            <div className="mb-3 ">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              <img
                src={profilePicture}
                alt="profile"
                className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 ms-2 rounded-circle"
                style={{ width: "110px", height: "110px" }}
                onClick={() => fileRef.current.click()}
              />
              <p className="text-sm">
                {imageError ? (
                  <span className="text-danger">
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span className="text-success">Image uploaded successfully</span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Your Name"
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
              />
            </div>
            <button type="submit" className="btn btn-outline-success mb-3 form-control ">
              UPDATE
            </button>
        <div className="mt-3 d-flex justify-content-between">
        <div>
          <FaUserTimes size={30} className="text-danger" onClick={handleDeleteAccount}  style={{ cursor: 'pointer' }} />
          <p className="text-danger">Delete Account</p>
        </div>
        <div>
          <FaSignOutAlt size={30} className="text-secondary" onClick={handleSignOut} style={{ cursor: 'pointer' }} />
           <p  className="text-secondary">Sign-Out</p>
        </div>
         
        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
