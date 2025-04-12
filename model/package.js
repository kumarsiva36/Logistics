const mongoose = require('mongoose');
const packageSchema = mongoose.Schema({
    pId: { type: BigInt, unique: true, required: true },
    packageId: { type: String, unique: true, required: true },
    source: { type: String, required: true },
    sourceLocation: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number],
      },
    destination: { type: String, required: true },
    destinationLocation: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number],
      },
    status: { type: String, required: true },
    customer : { type : Array , "default" : [] },
    driver : { type : Array , "default" : [] },
    createdAt: { type: Date, default: Date.now }
},
{
    timestamps: true // Automatically adds createdAt and updatedAt
})
module.exports = mongoose.model('Package', packageSchema);