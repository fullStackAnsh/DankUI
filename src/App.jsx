import React from 'react'
import Home from './components/Home'
import Loader from './components/Loader'
import { Toaster } from "react-hot-toast";
import { useState,useEffect } from 'react';

function App() {
  const [serverRunning,setServerRunning]=useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
  let interval;
  const checkServer = async () => {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (res.ok) {
        setServerRunning(true);
        clearInterval(interval); // stop retrying
      }
    } catch (err) {
      console.log("Waking backend...");
    }
  };
  checkServer(); // immediate call
  interval = setInterval(checkServer, 3000); // retry every 3s
  return () => clearInterval(interval);
}, []);


  return (
    <>
     <Toaster position="top-center" />
     {!serverRunning && <Loader />}
    {serverRunning && <Home />}
    </>
  )
}

export default App