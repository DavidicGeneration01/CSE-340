// Needed Resources 
const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/");

// Default route to management view
router.get(
    '/',
    utilities.handleErrors(invController.buildManagementView)
)

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle description
router.get(
    "/detail/:vehicleId", 
    utilities.handleErrors(invController.vehicleDetail)
);


// Route to test server error (intentional error)
router.get(
    "/error", 
    utilities.handleErrors(invController.triggerError)
);

// Route to add classification view
router.get(
    "/add-classification", 
    utilities.handleErrors(invController.buildAddClassificationView)
);


module.exports = router;