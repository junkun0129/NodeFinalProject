const mongoose = require("mongoose")
const {Schema, model} = mongoose
const bcrypt = require("bcryptjs")
const {salt} = require("../config")

const userSchema = new Schema({
    name : { type: String, trim: true, required: true },
    email : { type: String, trim: true, required: true, unique: true },
    password : { type: String }
}, {
    timestamps: true,
})

module.exports = model("User", userSchema);