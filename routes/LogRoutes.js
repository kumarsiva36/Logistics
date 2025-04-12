const express = require("express");
const LogController = require('../controllers/logController');
const { check } = require("express-validator");
const Package = require('../model/package.js');
const Driver = require('../model/driver.js');

 
const router = express.Router();

router.get('/', (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });

router.post('/addpackage',[
    check('packageId','packageId is required').notEmpty(),
    // .custom((value, {req}) => {
    //     return new Promise((resolve, reject) => {
	//         Package.findOne({packageId:value}, function(err, user){
    //             if(err) {
    //               reject(new Error('Server Error'))
    //             }
    //             if(Boolean(user)) {
    //               reject(new Error('E-mail already in use'))
    //             }
    //             resolve(true)
    //         });
    //     });
    //   }),
    check("source",'Source is required').notEmpty(),
    check("destination",'Destination is required').notEmpty(),
    check("status",'Destination is required').notEmpty(),
  ], LogController.createpackage);
  router.post('/edit-package',[
    check('pId','packageId is required').notEmpty()
  ], LogController.editPackage);
  router.post('/update-package',[
    check('pId','packageId is required').notEmpty(),
    check('packageId','packageId is required').notEmpty(),
    check("source",'Source is required').notEmpty(),
    check("destination",'Destination is required').notEmpty(),
    check("status",'Destination is required').notEmpty(),
  ], LogController.updatePackage);
  router.post('/add-driver',[
    check("name",'name is required').notEmpty(),
    check("location",'location is required').notEmpty(),
    check("contact",'contact is required').notEmpty(),
  ], LogController.createDriver);
  router.post('/edit-driver',[
    check("driverId",'driverId is required').notEmpty()
  ], LogController.editDriver);
  router.post('/update-driver',[
    check("driverId",'driver id is required').notEmpty(),
    check("name",'name is required').notEmpty(),
    check("location",'location is required').notEmpty(),
    check("contact",'contact is required').notEmpty(),
  ], LogController.updateDriver);
  router.get('/view-package', LogController.viewPackeage);
  router.get('/view-drivers', LogController.viewDrivers);

 

 
module.exports = router;