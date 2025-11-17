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

/* ***********************
 * Middleware
 *************************/
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
