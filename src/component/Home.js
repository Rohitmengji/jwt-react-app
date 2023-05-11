import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by verifying the token
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage and reset the user state
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className='container'>
      <h1 className='mt-4'>
        Welcome{user ? `, ${user.firstName} ${user.lastName}` : ""}!
        {!user && ", Guest"}
      </h1>
      <div className='mt-4'>
        {user ? (
          <button className='btn btn-primary' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div>
            <Link to='/login' className='btn btn-primary me-2'>
              Login
            </Link>
            <Link to='/signup' className='btn btn-secondary'>
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
