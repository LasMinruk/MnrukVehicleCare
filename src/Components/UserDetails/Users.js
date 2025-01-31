import React, { useEffect, useState, useRef } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2"; // Import both Bar and Pie charts
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import "./Users.css";

// Register necessary components of Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] };
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users || []));
  }, []);

  // Prepare the data for the charts (vehicle type counts)
  const vehicleTypeCounts = users.reduce((acc, user) => {
    const { vehicleType } = user;
    if (vehicleType) {
      acc[vehicleType] = (acc[vehicleType] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(vehicleTypeCounts), // Vehicle types
    datasets: [
      {
        label: "Vehicle Type Distribution",
        data: Object.values(vehicleTypeCounts), // Counts of each vehicle type
        backgroundColor: "rgba(54, 162, 235, 0.6)", // A soft blue
        borderColor: "rgba(54, 162, 235, 1)", // Stronger blue for the border
        borderWidth: 2,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)", // Darker on hover
      },
    ],
  };

  const pieData = {
    labels: Object.keys(vehicleTypeCounts),
    datasets: [
      {
        data: Object.values(vehicleTypeCounts),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Distribution of Vehicle Types",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines for a cleaner look
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Lighter grid color for a subtle background
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); // Standard A4 size PDF
  
    // Set a professional font
    doc.setFont("helvetica", "bold");
  
    // Add Company Logo (centered at the top)
    const logoUrl = "/logo.jpg";
    doc.addImage(logoUrl, "JPEG", 75, 10, 60, 30); // Adjusted for better proportions
  
    // Add Company Details
    doc.setFontSize(14);
    doc.text("Minruk Vehicle care", 75, 45);
    doc.setFontSize(12);
    doc.text("123 Main Street, City", 75, 52);
    doc.text("Contact: (555) 123-4567", 75, 59);
    doc.text("Email: contact@mybuscompany.com", 75, 66);
  
    // Add a separator line
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);
  
    // Add Title for the Report
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Users Report", 80, 85);
  
    // Add spacing before the next section
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Vehicle Type Distribution", 20, 95);
  
    // Format Vehicle Type Data
    let yPos = 105;
    const vehicleTypeData = Object.entries(vehicleTypeCounts).map(([type, count]) => `${type}: ${count}`);
    vehicleTypeData.forEach((line) => {
      doc.text(line, 30, yPos);
      yPos += 8;
    });
  
    // Add spacing before the table
    doc.setLineWidth(0.3);
    doc.line(20, yPos + 5, 190, yPos + 5);
  
    // Table Styling and Formatting
    doc.autoTable({
      startY: yPos + 10,
      head: [["Name", "Contact", "Address", "Vehicle", "Type", "Appointment Date", "Done"]],
      body: users.map((user) => [
        user.name,
        user.contactNum,
        user.address.replace(/,/g, "\n"), // Break address into multiple lines for better fit
        user.vehicleNum,
        user.vehicleType,
        user.appointmentDate.substring(0, 10), // Remove time from date
        user.done ? "✔" : "✘",
      ]),
      margin: { top: 20 },
      styles: {
        fontSize: 12, // Increased font size
        cellPadding: 6, // More space between cells
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 102, 204], // Professional blue
        textColor: 255, // White font
        fontStyle: "bold",
        fontSize: 13, // Bigger headers
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Light grey rows for readability
      },
      columnStyles: {
        2: { cellWidth: 40 }, // Increase width of Address column
      },
    });
  
    // Save the formatted PDF
    doc.save("users_report.pdf");
  };
  

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateHandler = (id) => {
    navigate(`/userdetails/${id}`);
  };



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contactNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.vehicleNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.appointmentDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <br/><br/><br/><br/>
      <div className="button-container">
        <button className="form-button" onClick={handleDownloadPDF}>
          Print PDF
        </button>
        <button className="form-button" onClick={() => navigate("/regi")}>
  Register New Admin
</button>
     
      </div>

      {/* Smaller Chart Container */}
      <div className="chart-container" style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", padding: "20px" }}>
  {/* Bar Chart */}
  <div style={{ width: "48%", height: "300px" }}>
    <Bar data={chartData} options={chartOptions} />
  </div>
  {/* Smaller Pie Chart */}
  <div style={{ width: "40%", height: "400px" }}> {/* Adjusted width and height */}
    <Pie data={pieData} options={chartOptions} />
  </div>
</div>

      <div className="user-table-container" ref={componentRef}>
        <h1 className="user-table-title">User Details</h1>

        <input
          type="text"
          placeholder="Search by name, contact number, address, etc."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Vehicle Number</th>
              <th>Vehicle Type</th>
              <th>Appointment Date</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.contactNum}</td>
                <td>{user.address}</td>
                <td>{user.vehicleNum}</td>
                <td>{user.vehicleType}</td>
                <td>{user.appointmentDate}</td>
                
                <td>
                  <button
                    className="update-btn"
                    onClick={() => updateHandler(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
