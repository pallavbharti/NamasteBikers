const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    isAvailableNow: {
        type: Boolean,
        default: true
    },
    slots: [
        {
            startTime: { type: Date, required: true },
            endTime: { type: Date, required: true }
        }
    ]
}, { timestamps: true });

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;