const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/UserRoutes");

const app = express();
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON" });
    }
    next();
});

mongoose.connect("mongodb+srv://admin:HOdl2r99gFOAc3v3@cluster0.q4vtj.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => console.log(err));

// Register route

require("./Model/Register");
const User = mongoose.model("Register5");

// Register route
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    const user = new User({ name, gmail, password });
    await user.save();
    res.send("User Registered Successfully");
  } catch (err) {
    res.send({ status: "error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
    const { gmail, password } = req.body;
  
    try {
      const user = await User.findOne({ gmail });
  
      if (!user) {
        return res.json({ err: "User Not Found" });
      }
  
      if (user.password === password) {
        return res.json({ status: "ok" });
      } else {
        return res.json({ err: "incorrect Password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "server Err" });
    }
  });