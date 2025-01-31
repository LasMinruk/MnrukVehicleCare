import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => {
        alert("Registration Successful!");
        history("/log");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/register", {
        name: String(user.name),
        gmail: String(user.gmail),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div className="register-container">
      <Nav />

      <div className="register-header">
        <div className="register-text">
          <h1>Join Us Today!</h1>
          <p>Create your account to access exclusive features and stay updated with our latest services.</p>
        </div>
      </div>

      <div className="register-form-container">
        <h2 >Admin Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your username"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gmail">Email:</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              placeholder="Enter your email"
              value={user.gmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <p className="register-note">
          By registering, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Register;
