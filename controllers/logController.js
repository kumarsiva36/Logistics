const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
var db = mongoose.connection;
const Package = require('../model/package.js');
const Driver = require('../model/driver.js');
const Logs = require('../model/logs.js');

exports.createpackage = (req, res) => {
    // Run validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({status: 'error', message: 'Invalid Data', errors: errors.array()})
      //return res.status(400).json({ errors: errors.array() });
    }else{ 
        db.collection('packages').count(function (err, pcount) {
            const package = new Package({
                pId:pcount+1,
                packageId : req.body.packageId,
                source : req.body.source,
                sourceLocation : req.body.sourceLocation,
                destination : req.body.destination,
                destinationLocation : req.body.destinationLocation,
                status : req.body.status,
                customer : req.body.customer
            });
            package.save().then(data => {
                //console.log('Successfully created a new Package');
                res.status(200).json({status: 'success', message: 'Successfully created a new Package'})
            }).catch(error => {
                //console.log("Error-->",error)
                res.status(201).json({status: 'error', message: 'Package Id Already Exists'})
            })
        });       
        
    }     
}

exports.createDriver = (req, res) => {
    var dri_id = 1;
    Driver.find().sort({driverId : -1}).limit(1).then((data) => {
        if(data){
            dri_id = parseInt(data[0].driverId)+1;
            // Run validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({status: 'error', message: 'Invalid Data', errors: errors.array()})
            }else{        
            const driver = new Driver({
                    driverId :dri_id,
                    location : req.body.location,
                    locationcoord : req.body.locationcoord,
                    name : req.body.name,
                    contact : req.body.contact
                });
                driver.save().then(data => {
                    //console.log('Successfully created a Driver');
                    res.status(200).json({status: 'success', message: 'Successfully created a new Driver'})
                }).catch(error => {
                    //console.log("Error-->",error)
                    res.status(201).json({status: 'error', message: 'Invalid Data'})
                })
            }
        }            
    });    
         
}

exports.viewPackeage = (req, res) => {    
    Package.find().sort({createdAt : -1}).then((data,err) => {
        if(!err){
            let dat=[];
            data.forEach(dt => {
                dat.push({
                    pId : parseInt(dt['pId']),
                    packageId : dt['packageId'],
                    source : dt['source'],
                    destination : dt['destination'],
                    status : dt['status'],
                    customer : dt['customer'],
                    driver : dt['driver'],
                    sourceLocation : dt['sourceLocation'].coordinates,
                    destinationLocation : dt['destinationLocation'].coordinates,
                    createdAt : new Date(dt['createdAt']).toLocaleString(process.env.LOCALCODE,{hour12: false}) ,
                }) 
            });

            res.status(200).json({status: 'success', result: dat})
        }else{
            res.status(400).json({status: 'error', message: 'Invalid Request'})
        }
    });    
}
exports.editPackage = (req, res) => {    
    Package.find({"pId": req.body.pId}).limit(1).then((data,err) => {
        if(!err){
            let dat=[];
            data.forEach(dt => {
                dat.push({
                    pId : parseInt(dt['pId']),
                    packageId : dt['packageId'],
                    source : dt['source'],
                    sourceLocation : dt['sourceLocation'],                    
                    destination : dt['destination'],
                    destinationLocation : dt['destinationLocation'],
                    status : dt['status'],
                    customer : dt['customer'],
                    createdAt : new Date(dt['createdAt']).toLocaleString(process.env.LOCALCODE,{hour12: false}) ,
                }) 
            });

            res.status(200).json({status: 'success', result: dat})
        }else{
            res.status(400).json({status: 'error', message: 'Invalid Request'})
        }
    });    
}

exports.viewDrivers = (req, res) => {    
    Driver.find().sort({createdAt : -1}).then((data,err) => {
        let dat=[];
        data.forEach(dt => {
            dat.push({
                driverId : parseInt(dt['driverId']),
                name : dt['name'],
                contact : dt['contact'],
                location : dt['location'],
            }) 
         });
        //console.log("data-->",dat);
        if(data){
            res.status(200).json({status: 'success', result: dat})
        }else{
            res.status(400).json({status: 'error', message: 'Invalid Request'})
        }
    });    
}
exports.editDriver = (req, res) => {    
    Driver.find({"driverId": req.body.driverId}).limit(1).then((data,err) => {
        let dat=[];
        data.forEach(dt => {
            dat.push({
                driverId : parseInt(dt['driverId']),
                name : dt['name'],
                contact : dt['contact'],
                location : dt['location'],
                locationcoord : dt['locationcoord'],
            }) 
         });
        if(data){
            res.status(200).json({status: 'success', result: dat})
        }else{
            res.status(400).json({status: 'error', message: 'Invalid Request'})
        }
    });    
}

exports.updatePackage = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({status: 'error', message: 'Invalid Data', errors: errors.array()})
    }else{
        Package.findOneAndUpdate(
            { "pId": req.body.pId },
            { "$set": { packageId: req.body.packageId,
                source : req.body.source,
                sourceLocation : req.body.sourceLocation,
                destination : req.body.destination,
                destinationLocation : req.body.destinationLocation,
                status : req.body.status,
                customer : req.body.customer
             } },
             { "new": true }
        ).then(rs => {
            if(rs){
                res.status(200).json({status: 'success', message: 'Package updated successfully'})
            }else{
                res.status(201).json({status: 'error', message: 'Invalid Data'})
            }
          });      
    }     
}
exports.updateDriver = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({status: 'error', message: 'Invalid Data', errors: errors.array()})
    }else{
        Driver.findOneAndUpdate(
            { "driverId": req.body.driverId },
            { "$set": { name: req.body.name,
                location : req.body.location,
                locationcoord : req.body.locationcoord,
                contact : req.body.contact,
             } },
             { "new": true }
        ).then(rs => {
            if(rs){
                res.status(200).json({status: 'success', message: 'Driver updated successfully'})
            }else{
                res.status(201).json({status: 'error', message: 'Invalid Data'})
            }
          });      
    }     
}

exports.getPackageDrivers = (req, res) => {    
    Package.find({"pId": req.body.pId}).limit(1).then((data,err) => {
        if(!err){
            var sourceloc = '';
            var packageId = '';
            data.forEach(dt => {
                sourceloc = dt['sourceLocation'];
                packageId = dt['packageId'];                 
            });

            Driver.find({
                locationcoord: {
                  $near: {
                    $geometry: sourceloc, 
                    $maxDistance: 70000 // Search within 7km
                  }
                },
                assigned : { $ne : '1'}
              }).limit(5).then((dt,er)=>{
                if(!er){
                    let dat=[];
                    dt.forEach(dt => {
                        dat.push({
                            driverId : parseInt(dt['driverId']),
                            name : dt['name'],
                            contact : dt['contact'],
                        }) 
                    });
                    res.status(200).json({status: 'success',packageId:packageId, drivers: dat})
                }else{
                    res.status(400).json({status: 'error', message: 'Invalid Request'})
                }
              })
        }else{
            res.status(400).json({status: 'error', message: 'Invalid Request'})
        }
    });    
}
exports.assignDriver = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({status: 'error', message: 'Invalid Data', errors: errors.array()})
    }else{
        Package.findOneAndUpdate(
            { "pId": req.body.pId },
            { "$set": { driver: req.body.driver
             } },
             { "new": true }
        ).then(rs => {
            if(rs){
                Driver.findOneAndUpdate(
                    { "driverId": parseInt(req.body.driver['id']) },
                    { "$set": { assigned: "1"
                     } },
                     { "new": true }
                ).then(up=>{
                    if(up){
                        //console.log("UP--->",up)
                        res.status(200).json({status: 'success', message: 'Driver assigned successfully'})
                    }else{
                        res.status(201).json({status: 'error', message: 'Invalid Data'})
                    }
                })                
            }else{
                res.status(201).json({status: 'error', message: 'Invalid Data'})
            }
          });      
    }     
}
exports.StatusUpdate = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({status: 'error', message: 'Invalid Data', errors: errors.array()})
    }else{
        Package.findOneAndUpdate(
            { "pId": req.body.pId },
            { "$set": { status: req.body.status
             } },
             { "new": true }
        ).then(rs => {
            if(rs){                
                Package.find({"pId": req.body.pId}).limit(1).then((data,err) => {                    
                    if(!err){
                        
                        if(req.body.status=='Delivered'){ //Change driver status 
                            Driver.findOneAndUpdate(
                                { "driverId": parseInt(data[0]['driver'][0]['id']) },
                                { "$set": { assigned: "0"
                                 } },
                                 { "new": true }
                            ).then(dupdate=>{
                                if(dupdate)
                                    console.log("DriverId-->",data[0]['driver'][0]['id'])
                            })
                            
                        }
                        db.collection('logs').count(function (err, pcount) {
                            const logs = new Logs({
                                lId:pcount+1,
                                packageId : data[0]['packageId'],
                                status : req.body.status,
                                message : 'Package Status Update',
                                driver : data[0]['driver']
                            });
                            logs.save().then(data => {
                                //console.log('Successfully created a new Package');
                                res.status(200).json({status: 'success', message: 'Status updated successfully'}) 
                            }).catch(error => {
                                //console.log("Error-->",error)
                                res.status(400).json({status: 'error', message: 'Invalid Request'})
                            })
                        });
                        
                    }else{
                        res.status(400).json({status: 'error', message: 'Invalid Request'})
                    }
                });
                               
            }else{
                res.status(201).json({status: 'error', message: 'Invalid Data'})
            }
          });      
    }     
}
exports.statusLogs = (req, res) => {    
    Logs.find().sort({createdAt : -1}).then((data,err) => {
        if(!err){
            let dat=[];
            data.forEach(dt => {
                dat.push({
                    lId : parseInt(dt['lId']),
                    packageId : dt['packageId'],
                    status : dt['status'],
                    driver : dt['driver'],                    
                    createdAt : new Date(dt['createdAt']).toLocaleString(process.env.LOCALCODE,{hour12: false}) ,
                }) 
            });

            res.status(200).json({status: 'success', result: dat})
        }else{
            res.status(400).json({status: 'error', message: 'Invalid Request'})
        }
    });    
}








