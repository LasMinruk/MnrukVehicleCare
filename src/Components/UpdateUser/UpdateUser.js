import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./UpdateUser.css";

const UpdateUser = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // To navigate after updating
  const [inputs, setInputs] = useState({
    name: "",
    contactNum: "",
    address: "",
    vehicleNum: "",
    vehicleType: "",
    appointmentDate: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  // List of vehicle types (same as the backend validation)
  const vehicleTypes = [
    'car', 'bus', 'van', 'truck', 'motorcycle', 'scooter', 'three-wheeler',
    'tractor', 'jeep', 'lorry', 'bicycle', 'pickup', 'minivan', 'SUV',
    'camper', 'ambulance', 'firetruck', 'tanker', 'trailer', 'heavy equipment'
  ];

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with ID:", id); // Debugging
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setInputs(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Could not fetch user data.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, inputs);
      alert("User updated successfully!");
      navigate("/userdetails"); // Redirect to Users page after update
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update user.");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }} className="form-container">
      <Nav />
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label className="form-label">Name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className="form-label">Contact Number</label>
          <input
            className="form-input"
            type="text"
            id="contactNum"
            name="contactNum"
            value={inputs.contactNum || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className="form-label">Address</label>
          <input
            className="form-input"
            type="text"
            id="address"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className="form-label">Vehicle Number</label>
          <input
            className="form-input"
            type="text"
            id="vehicleNum"
            name="vehicleNum"
            value={inputs.vehicleNum || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className="form-label">Vehicle Type</label>
          <select
            className="form-input"
            id="vehicleType"
            name="vehicleType"
            value={inputs.vehicleType || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Vehicle Type</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className="form-label">Appointment Date</label>
          <input
            className="form-input"
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={inputs.appointmentDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
