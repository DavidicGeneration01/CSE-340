const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')


// Login & registration views
router.get("/login", accountController.buildLogin);
router.get("/register", accountController.buildRegister);

// Login & registration processing
router.post("/login", accountController.loginAccount);
router.post("/register", accountController.registerAccount);

// Account management
router.get("/", accountController.accountManagement);
router.get("/update/:account_id", accountController.buildAccountUpdate);
router.post("/update", accountController.updateAccount);
router.post("/update-password", accountController.updatePassword);



// Login page route
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    account_email: '',
    nav: '<ul><li><a href="/">Home</a></li></ul>' // example nav HTML
  });
});

// Logout
router.get("/logout", accountController.accountLogout);

module.exports = router;
