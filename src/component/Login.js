import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        // Login successful
        console.log(data);
        setFormData({ email: "", password: "" });
        // Save the token to local storage or use it as needed
        localStorage.setItem("token", data.token);
        // Redirect to the home page
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h1 className='mt-4'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email Address:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary mt-3 mx-2' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
