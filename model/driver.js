const mongoose = require('mongoose');
const driverSchema = mongoose.Schema({
    driverId: { type: BigInt, unique: true, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    locationcoord: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number],
      },
    contact: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},
{
    timestamps: true // Automatically adds createdAt and updatedAt
})
module.exports = mongoose.model('Driver', driverSchema);