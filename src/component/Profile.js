import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Make a request to the backend to fetch the user data
      fetch("http://localhost:3001/profile", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Profile Page</h1>
      {user ? (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email Address: {user.email}</p>
          <p>Phone Number: {user.mobileNumber}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
