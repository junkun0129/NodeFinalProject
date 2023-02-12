const config = require("../config")
const mongoose = require("mongoose")

const connect = mongoose.connect(config.databaseURL);
connect.then(()=>console.log("Connected to DB")).catch(err=>console.error(err))