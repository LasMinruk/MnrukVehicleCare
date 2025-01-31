import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    contactNum: "",
    address: "",
    vehicleNum: "",
    vehicleType: "",
    appointmentDate: "",
    price: 0, // New price field
  });

  // Define service prices for different vehicle types (in LKR)
  const vehiclePrices = {
    car: 1000,
    bus: 2000,
    van: 1200,
    truck: 2100,
    motorcycle: 600,
    scooter: 600,
    "three-wheeler": 800,
  };

  // Handle input changes and update price when vehicle type is selected
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
      price: name === "vehicleType" ? vehiclePrices[value] || 0 : prevState.price, // Set price based on vehicle type
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendRequest();
      generatePDF();
      alert("User details submitted successfully!");
      navigate("/mainhome");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit user details.");
    }
  };

  // Send user data to the backend
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users", {
      name: String(inputs.name),
      contactNum: String(inputs.contactNum),
      address: String(inputs.address),
      vehicleNum: String(inputs.vehicleNum),
      vehicleType: String(inputs.vehicleType),
      appointmentDate: String(inputs.appointmentDate),
      price: inputs.price, // Send price to the backend
    });
  };

  // Generate a PDF invoice
  const generatePDF = () => {
    const doc = new jsPDF();

    // Company Info
    const companyName = "Minruk Vehicle Care"; // Company Name
    const companyAddress = "123, Main Street, Gampaha, Sri Lanka";
    const companyPhone = "+1 234 567 890";
    const companyEmail = "support@xyzvehicleservices.com";
    const ownerName = "Lasiru Minruk"; // Owner's Name

    // Paths for Logo & Signature (Ensure these are in /public/)
    const logoPath = "/logo.jpg"; // Changed to .jpg
    const signaturePath = "/signature.jpg"; // Changed to .jpg

    // Add Company Logo (if exists)
    const logo = new Image();
    logo.src = logoPath;
    logo.onload = () => {
      doc.addImage(logo, "JPG", 10, 10, 40, 25); // Logo at top-left

      // Add Company Details
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(companyName, doc.internal.pageSize.width / 2, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(companyAddress, doc.internal.pageSize.width / 2, 28, { align: "center" });
      doc.text(`Phone: ${companyPhone} | Email: ${companyEmail}`, doc.internal.pageSize.width / 2, 36, { align: "center" });

      addInvoiceContent();
    };

    const addInvoiceContent = () => {
      // Invoice Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", doc.internal.pageSize.width / 2, 50, { align: "center" });

      // User Details Table
      const data = [
        ["Customer Name", inputs.name],
        ["Contact Number", inputs.contactNum],
        ["Address", inputs.address],
        ["Vehicle Number", inputs.vehicleNum],
        ["Vehicle Type", inputs.vehicleType],
        ["Appointment Date", inputs.appointmentDate],
        ["Service Price (LKR)", `Rs. ${inputs.price}`], // Include price in Rupees
      ];

      doc.autoTable({
        startY: 60,
        head: [["Field", "Value"]],
        body: data,
        theme: "grid",
        styles: { fontSize: 12 },
        headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      });

      // Special Message
      doc.setFont("helvetica", "italic");
      doc.setFontSize(12);
      doc.text(
        "This is your official invoice. Please present this document to our agent upon arrival at your location.",
        doc.internal.pageSize.width / 2,
        doc.autoTable.previous.finalY + 15,
        { align: "center" }
      );

      // Signature Section
      doc.setFont("helvetica", "normal");
      doc.text("Authorized Signature", 20, doc.autoTable.previous.finalY + 40);
      doc.line(20, doc.autoTable.previous.finalY + 42, 80, doc.autoTable.previous.finalY + 42); // Signature line

      // Add Signature Image (if exists)
      const signature = new Image();
      signature.src = signaturePath;
      signature.onload = () => {
        doc.addImage(signature, "JPG", 20, doc.autoTable.previous.finalY + 45, 50, 20);
        doc.text(ownerName, 20, doc.autoTable.previous.finalY + 70); // Owner's Name Below Signature
        doc.text(companyName, 20, doc.autoTable.previous.finalY + 78);
        doc.save(`User_Invoice_${inputs.name}.pdf`);
      };

      // If Signature Fails to Load, Download PDF Without It
      signature.onerror = () => {
        doc.text(ownerName, 20, doc.autoTable.previous.finalY + 70);
        doc.text(companyName, 20, doc.autoTable.previous.finalY + 78);
        doc.save(`User_Invoice_${inputs.name}.pdf`);
      };
    };

    // If Logo Fails to Load, Generate PDF Without It
    logo.onerror = addInvoiceContent;
  };

  // **Inline Background Style**
  const backgroundStyle = {
    backgroundImage: `url("/hero1.jpg")`, // Ensure this image is in the public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={backgroundStyle}>
      <Nav />
      <div className="form-container">
        <h1 className="form-title">Add User Details</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} className="form-input" required />

          <label className="form-label">Contact Number</label>
          <input type="text" name="contactNum" onChange={handleChange} value={inputs.contactNum} className="form-input" pattern="\d{10}" required />

          <label className="form-label">Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} className="form-input" required />

          <label className="form-label">Vehicle Number</label>
          <input type="text" name="vehicleNum" onChange={handleChange} value={inputs.vehicleNum} className="form-input" required />

          <label className="form-label">Vehicle Type</label>
          <select name="vehicleType" onChange={handleChange} value={inputs.vehicleType} className="form-input" required>
            <option value="">Select Vehicle Type</option>
            {Object.keys(vehiclePrices).map((type) => (
              <option key={type} value={type}>{type.toUpperCase()} - Rs. {vehiclePrices[type]}</option>
            ))}
          </select>

          <label className="form-label">Appointment Date</label>
          <input type="date" name="appointmentDate" onChange={handleChange} value={inputs.appointmentDate} className="form-input" required />

          <button type="submit" className="form-button">Submit & Get Invoice</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
