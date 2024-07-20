import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:7000/api/v1/users/register-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success) {
        // alert("Account Created");
        toast("Account Created Successfully!");
        setTimeout(() => {
            navigate("/login");
        }, 3000)
      } else {
        // alert(data.message);
        toast(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create account");
    }
  };

  return (
    <div className='signup-container'>
         <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition: Bounce
        />
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
       
        <label>
          <p>Username</p>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
            className='input-box'
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
            className='input-box'
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
            className='input-box'
          />
        </label>
        <p style={{textAlign:"center"}}>Already have an account? <Link to="/login">Login</Link></p>
        <button className='login-btn' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
