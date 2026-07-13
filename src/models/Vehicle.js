const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    numberPlate: {
        type: String,
        required: true,
        unique: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    rcImage: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;