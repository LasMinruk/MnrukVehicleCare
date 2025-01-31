const User = require("../Model/UserModel");

// DATA DISPLAY
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        // Get all users from the database
        users = await User.find();
    } catch (error) {
        console.log(error);  // Log the error for debugging
        return res.status(500).json({ message: "Internal server error." });
    }

    // If no users are found
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found." });
    }

    // Display all users
    return res.status(200).json({ users });
};

// DATA INSERT
const addUsers = async (req, res, next) => {
    const {
        name,
        contactNum,
        address,
        vehicleNum,
        vehicleType,
        appointmentDate,
    } = req.body;

    // Validate required fields
    if (!name || !contactNum || !address || !vehicleNum || !vehicleType || !appointmentDate) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure vehicleNum is not null
    if (vehicleNum === null || vehicleNum === undefined) {
        return res.status(400).json({ message: "Vehicle number must be provided and cannot be null." });
    }

    // Create a new user instance
    let user;

    try {
        user = new User({
            name,
            contactNum,
            address,
            vehicleNum,
            vehicleType,
            appointmentDate,
        });

        // Save the user to the database
        await user.save();
    } catch (error) {
        // Check if the error is a duplicate key error (e.g., vehicle number already exists)
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate key error: vehicle number must be unique." });
        }
        console.log(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error." });
    }

    // If user creation was successful, respond with the created user
    return res.status(201).json({ user });
};

// Get by id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
    }

    // not available users
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
};

// UPDATE USER DETAILS
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, contactNum, address, vehicleNum, vehicleType, appointmentDate } = req.body;

    // Validate required fields
    if (!name || !contactNum || !address || !vehicleNum || !vehicleType || !appointmentDate) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure vehicleNum is not null
    if (vehicleNum === null || vehicleNum === undefined) {
        return res.status(400).json({ message: "Vehicle number must be provided and cannot be null." });
    }

    let user;

    try {
        // Check if the user exists before updating
        user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Update the user details
        user.name = name;
        user.contactNum = contactNum;
        user.address = address;
        user.vehicleNum = vehicleNum;
        user.vehicleType = vehicleType;
        user.appointmentDate = appointmentDate;

        await user.save();
    } catch (err) {
        console.log(err); // Log the error
        return res.status(500).json({ message: "Internal server error." });
    }

    return res.status(200).json({ user });
};

//DELETE USER DETAILS
const deleteUser = async(req, res, next) =>{
    const id = req.params.id;

    let user;

    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"Unabe to Delete details"});

    }
    return res.status(200).json({user});

}

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;