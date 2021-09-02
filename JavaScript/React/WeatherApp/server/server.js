const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
 
const app = express();
 
// bodyparser middleware
app.use(bodyParser.json());
 
// DB config
// DB configuration files and requires will go here
 
// connect to mongo
// Mongodb conneciton will go here
 
// use routes
 
const port = process.env.PORT || 5000;
 
app.listen(port, () => console.log(`Server started on port ${port}`));
