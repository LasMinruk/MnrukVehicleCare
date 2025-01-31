//mongoose ekata add karaganawa
const mongoose = require('mongoose');

//add karagatta mongoose eka schema ekata assign karaganawa
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,    //dataType
        required: true, //validate
        trim: true, // Remove leading/trailing spaces
    },

    contactNum: {
        type: String,    // Changed to String to allow specific format validation
        required: true, //validate
        match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'], // Validates Sri Lankan numbers
    },

    address: {
        type: String,    //dataType
        required: true, //validate
    },

    vehicleNum: {
        type: String,
        required: true,
        unique: true,
    },
    
    vehicleType: {
        type: String,    //dataType
        required: true, //validate
        enum: [
            'car', 'bus', 'van', 'truck', 'motorcycle', 'scooter', 'three-wheeler',
            'tractor', 'jeep', 'lorry', 'bicycle', 'pickup', 'minivan', 'SUV',
            'camper', 'ambulance', 'firetruck', 'tanker', 'trailer', 'heavy equipment'
        ], // Limit acceptable types
    },

 

    appointmentDate: {
        type: Date,    // New field for appointment date
        required: true, //validate
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensures the date is not in the past
            },
            message: 'The appointment date cannot be in the past.',
        },
    },
});

module.exports = mongoose.model(
    "UserModel3", //file Name
    userSchema // function name
);
