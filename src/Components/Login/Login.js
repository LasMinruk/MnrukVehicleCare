import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((response) => {
        if (response.status === "ok") {
          alert("Login Success");
          navigate("/userdetails");
        } else {
          // Set error message from the API response
          setErrorMessage(response.err || "Something went wrong");
        }
      })
      .catch((err) => {
        setErrorMessage("Server error. Please try again later.");
      });
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/login", {
        gmail: String(user.gmail),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div className="page-container2">
      <Nav />

      {/* Company Name as Heading */}
      <h1 className="company-name">Minruk PVT Ltd</h1>
      
      {/* Login Form */}
      <div className="form-container2">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="gmail" className="form-label2">
              Email:
            </label>
            <input
              className="form-input2"
              type="email"
              id="gmail"
              name="gmail"
              value={user.gmail}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label2">
              Password:
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>
          {/* Display error messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="form-button">Login</button>
        </form>
      </div>
<br/><br/>
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Minruk PVT Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
