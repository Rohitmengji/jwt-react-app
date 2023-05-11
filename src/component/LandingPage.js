import React, { useState } from "react";

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = () => {
    // Simulating a successful login
    setLoggedIn(true);
    setUserName("John Doe"); 

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      {loggedIn ? (
        <h2>Hello, {userName}!</h2>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default LandingPage;
