"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "short-video-generator-143fb.firebaseapp.com",
  projectId: "short-video-generator-143fb",
  storageBucket: "short-video-generator-143fb.firebasestorage.app",
  messagingSenderId: "679947576934",
  appId: "1:679947576934:web:5feed7fd9fce57efc16fa7",
  measurementId: "G-FK9V5R0Y2W"
};

// Initialize Firebase (client only)
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);

