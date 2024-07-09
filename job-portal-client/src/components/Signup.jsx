import React from 'react'
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from '../Firebase/firebase.config';


const Signup = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleSignup = () => {
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    
  }).catch((error) => {
    
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <button onClick={handleSignup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </div>
  )
}

export default Signup