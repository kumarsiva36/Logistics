const mongoose = require('mongoose');
const logsSchema = mongoose.Schema({
    lId: { type: BigInt, unique: true, required: true },
    packageId: { type: String,  required: true },    
    status: { type: String, required: true },
    message: { type: String, required: true },
    driver : { type : Array , "default" : [] },
    createdAt: { type: Date, default: Date.now }
},
{
    timestamps: true // Automatically adds createdAt and updatedAt
})
module.exports = mongoose.model('Logs', logsSchema);