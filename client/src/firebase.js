// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcUj1RNQbPa40DLIsYyEbbrgwxNSNzHls" ,
  authDomain: "dahal-kirana.firebaseapp.com",
  projectId: "dahal-kirana",
  storageBucket: "dahal-kirana.appspot.com",
  messagingSenderId: "841358293701",
  appId: "1:841358293701:web:1925208003d06d7b0d8eac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };