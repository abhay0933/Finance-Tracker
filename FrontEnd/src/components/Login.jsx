import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TransactionsContext } from "../context/TransactionsContext"; 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { resetState, fetchIncome, fetchExpense } = useContext(TransactionsContext); 

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast("Login Successful!");

        // Save token in local storage
        localStorage.setItem("token", data.token);

        // Reset state to clear old data
        resetState();

        // Fetch new user's data
        await fetchIncome();
        await fetchExpense();

        setTimeout(() => {
            navigate("/dashboard");
        }, 2000); // Redirect to dashboard or any other page
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to login");
    }
  };

  return (
    <div className='login-container'>
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
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <label>
          <p>Email</p>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
            className="input-box"
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
            className="input-box"
          />
        </label>
        <p style={{textAlign:"center"}}>Don't have an account? <Link to="/">Sign Up</Link></p>
        <button className="login-btn" type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
