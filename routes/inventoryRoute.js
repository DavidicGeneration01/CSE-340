// Needed Resources 
const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/");

// --------------------------------------
// Default route to management view
// --------------------------------------
router.get(
  "/",
  utilities.handleErrors(invController.buildManagementView)
);

// --------------------------------------
// Build inventory by classification view
// --------------------------------------
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// --------------------------------------
// Vehicle detail page
// --------------------------------------
router.get(
  "/detail/:vehicleId",
  utilities.handleErrors(invController.vehicleDetail)
);

// --------------------------------------
// Test server error route
// --------------------------------------
router.get(
  "/error",
  utilities.handleErrors(invController.triggerError)
);

// --------------------------------------
// Add Classification (GET)
// --------------------------------------
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassificationView)
);

// --------------------------------------
// Add Classification (POST)
// --------------------------------------
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addClassification)
);

// --------------------------------------
// Add Inventory (GET)
// --------------------------------------
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventoryView)
);

// --------------------------------------
// Add Inventory (POST)
// --------------------------------------
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

// --------------------------------------
// Get Inventory as JSON
// --------------------------------------
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// --------------------------------------
// Edit Inventory (GET)
// --------------------------------------
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView)
);

// --------------------------------------
// Update Inventory (POST)
// --------------------------------------
router.post(
  "/update",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// --------------------------------------
// Delete Inventory (GET)
// --------------------------------------
router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.deleteInventoryView)
);

// --------------------------------------
// Delete Inventory (POST)
// --------------------------------------
router.post(
  "/delete",
  utilities.handleErrors(invController.deleteInventory)
);

module.exports = router;
