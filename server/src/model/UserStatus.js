const mongoose = require("mongoose");
const {Schema, model, SchemaTypes} = mongoose;

const userStatusSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User", 
        required: true,
    },
    hp:{
        type:Number,
        required: true
    },
    at:{
        type:Number,
        required: true
    }

    
})

const Status = model("Status", userStatusSchema);
module.exports = Status;
