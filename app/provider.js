"use client"
import React, { use, useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "@/configs/firebaseConfig"; // Adjust the import path as necessary
import { AuthContext } from './_context/AuthContext';
import { useState, useContext } from 'react';

function provider({children}) {

  const [user,setUser]=useState();
  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
      
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