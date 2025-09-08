"use client";
import React, { useEffect } from "react";
import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence } from "firebase/auth"; // ✅ import this


function Authentication({ children }) {
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    // Handle redirect result if popup was blocked
    (async () => {
      try {
        const res = await getRedirectResult(auth);
        if (res?.user) {
          console.log("[Firebase] Redirect sign-in user:", {
            uid: res.user.uid,
            email: res.user.email,
            projectId: auth.app?.options?.projectId,
          });
        }
      } catch (e) {
        console.warn("[Firebase] getRedirectResult error", e);
      }
    })();
  }, []);

  const onSignInClick = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("[Firebase] Popup sign-in user:", {
        uid: user.uid,
        email: user.email,
        projectId: auth.app?.options?.projectId,
      });
    } catch (error) {
      console.error("[Firebase] Popup sign-in error:", error?.code || error);
      // Fallback to redirect for popup blockers or similar issues
      if (
        error?.code === "auth/popup-blocked" ||
        error?.code === "auth/cancelled-popup-request" ||
        error?.code === "auth/popup-closed-by-user"
      ) {
        try {
          await signInWithRedirect(auth, provider);
        } catch (err) {
          console.error("[Firebase] Redirect sign-in error:", err?.code || err);
        }
      }
    }
  };

  return (
    <div onClick={onSignInClick}>
      {children}
    </div>
  );
}

export default Authentication;
