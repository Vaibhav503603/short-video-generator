"use client";
import React from "react";
import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // ✅ import this


function Authentication({ children }) {
  const provider = new GoogleAuthProvider();

  const onSignInClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Signed in user:", user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  return (
    <div onClick={onSignInClick}>
      {children}
    </div>
  );
}

export default Authentication;
