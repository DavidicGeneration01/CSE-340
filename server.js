/* ******************************************
 * server.js - Primary file of the application
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require("./controllers/baseController")
const staticRoutes = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const flash = require("connect-flash")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const accountRoutes = require("./routes/accountRoute");
require("dotenv").config();

/* ***********************
 * Express App Setup
 *************************/
const app = express()

/* ***********************
 * View Engine and Layouts
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET || "secret", resave: false, saveUninitialized: true }));
app.use(flash());

/* ***********************
 * Middleware
 *************************/
// Middleware to make flash messages available in all views
app.use((req, res, next) => {
  res.locals.messages = req.flash.bind(req);
  next();
});

// Make nav available in all views
app.use((req, res, next) => {
  res.locals.nav = '<ul><li><a href="/">Home</a></li><li><a href="/account/login/Register">Login/Register</a></li></ul>';
  next();
});

// Make nav available in all views
app.use((req, res, next) => {
  res.locals.nav = '<ul><li><a href="/">Home</a></li><li><a href="/account/register">Register</a></li></ul>';
  next();
});



// Serve static files (CSS, JS, images) from /public
app.use(express.static("public"))

// Custom static routes (if any)
app.use(staticRoutes)

/* ***********************
 * Routes
 *************************/
// Index route
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

// Routes
app.use("/account", accountRoutes);

// Test home route
app.get("/", (req, res) => res.send("Home Page"));

// 404 handler
app.use((req, res) => res.status(404).send("Page not found"));


/* ***********************
 * Server Configuration
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`)
})
