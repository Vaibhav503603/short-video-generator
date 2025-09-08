"use client"
import React, { useEffect, useState, useContext } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { AuthContext } from './_context/AuthContext';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust path based on your folder structure


 export function AuthProvider({children}) {

  const [user,setUser]=useState();
  const createUser=useMutation(api.users.createUser);

  useEffect(() => {
    let unsubscribe;
    (async () => {
      const { onAuthStateChanged } = await import('firebase/auth');
      const { auth } = await import("@/configs/firebaseConfig");
      unsubscribe=onAuthStateChanged(auth, async(currentUser) => {
        console.log(currentUser);
        setUser(currentUser);

        if (currentUser?.email) {
          const result = await createUser({
            name: currentUser.displayName || '',
            email: currentUser.email,
            pictureUrl: currentUser.photoURL || ''
          });
          console.log(result);
          setUser(result);
        }
      });
    })();
    return () => unsubscribe && unsubscribe();
  }, [])


  return (
    <div>
        <AuthContext.Provider value={{user}}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > 
         {children}
        </NextThemesProvider>
        </AuthContext.Provider>
    </div>
  )
}

export const useAuthContext=() => {
  const context = useContext(AuthContext);
  return context;
}

export default AuthProvider;