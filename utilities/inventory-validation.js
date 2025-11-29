const { body, validationResult } = require('express-validator');
const utilities = require(".");
const validate = {};

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage('Classification name is required')
        .isAlpha()
        .withMessage('Classification name must contain only letters')
    ];
};

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        body("classification_id")
        .isNumeric()
        .withMessage("Please select a classification."),

        body('inv_make')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Please provide the vehicle make'),

        body('inv_model')
        .trim()
        .isLength({ min:1 })
        .withMessage('Please provide the vehicle model'),
        
        body('inv_description')
        .trim()
        .isLength({ min:1 })
        .withMessage('Please provide a description'),
        
        body('inv_image')
        .trim()
        .isLength({ min:1 })
        .withMessage('Please provide an image path'),
        
        body('inv_thumbnail')
        .trim()
        .isLength({ min:1 })
        .withMessage('Please provide a thumbnail path'),

        body('inv_price')
        .trim()
        .isNumeric()
        .withMessage('Please provide a valid price'),
        
        body('inv_year')
        .trim()
        .isNumeric()
        .withMessage('Please provide a valid year'),
        
        body('inv_miles')
        .trim()
        .isNumeric()
        .withMessage('Please provide a valid mileage'),
        
        body('inv_color')
        .trim()
        .isLength({ min:1 })
        .withMessage('Please provide a vehicle color')
    ];
};

/* **********************************
 *  Middleware to check validation results
 * ********************************* */
validate.checkInventoryData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const nav = utilities.getNav(); // get navigation
        const classificationList = utilities.buildClassificationList();
        return res.status(400).render("inventory/add-inventory", {
            title: "Add Inventory",
            nav,
            classificationList,
            errors: errors.array(),
            ...req.body
        });
    }
    next();
};

validate.checkUpdateData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const nav = utilities.getNav();
        const classificationList = utilities.buildClassificationList(req.body.classification_id);
        return res.status(400).render("inventory/edit-inventory", {
            title: `Edit ${req.body.inv_make} ${req.body.inv_model}`,
            nav,
            classificationList,
            errors: errors.array(),
            ...req.body
        });
    }
    next();
};

module.exports = validate;
