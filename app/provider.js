"use client"
import React, { use, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "@/configs/firebaseConfig"; // Adjust the import path as necessary
import { AuthContext } from './_context/AuthContext';
import { useState, useContext } from 'react';
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust path based on your folder structure


function provider({children}) {

  const [user,setUser]=useState();
  const createUser=useMutation(api.users.createUser);

  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, async(user) => {
      console.log(user);
      setUser(user);

      const result = await createUser({
        name: user?.displayName,
        email: user?.email,
        pictureUrl: user?.photoURL
      });
      console.log(result);
      
    })
    return () =>unsubscribe();
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

export default provider