import React from 'react';
import toast from 'react-hot-toast';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';

const OAuth = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSuccess = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;

      // Sending the authenticated user's information to your backend
      const res = await axios.post('/api/v1/auth/google', {
        name: displayName,
        email: email,
        profilePicture: photoURL,
      });

      // Assuming your backend response contains user and token
      const { user, token } = res.data;
      setAuth({
        ...auth,
        user,
        token,
      });

      localStorage.setItem('auth', JSON.stringify({ user, token }));
      navigate(location.state || '/');
    } catch (error) {
      console.error(error);
      toast.error('Error occurred while logging in with Google');
    }
  };

  return (
    <div className="mb-2 mt-2">
      <GoogleButton onClick={handleGoogleSuccess}  />
    </div>
  );
};

export default OAuth;
