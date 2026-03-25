"use client"; 

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDO13UJoYieglXJYSGnENrTi0CCjGbn6yM",
  authDomain: "ppgbdl-eea35.firebaseapp.com",
  projectId: "ppgbdl-eea35",
  storageBucket: "ppgbdl-eea35.firebasestorage.app",
  messagingSenderId: "849226916208",
  appId: "1:849226916208:web:78b578303377706467afb5",
};

const app = initializeApp(firebaseConfig);


export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

  