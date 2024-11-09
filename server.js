// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
app.use(express.json());

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const PORT = 8000;
const server = app.listen(PORT, listen);
function listen() {
  console.log(`Server running on http://localhost:${PORT}`);
}

//get route
app.get("/getWeatherData", (req, res) => {
  res.send(projectData);
});
//post route
app.post("/addWeatherData", (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse };
  res.send({ message: "Data added successfully" });
});
