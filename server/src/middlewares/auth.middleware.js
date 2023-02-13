const JWT = require("jsonwebtoken")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")

const {jwtSecret, salt} = require("../config");

const User = require("../model/User")

const signUp = async(data)=>{
    const {email} = data;
    let user = await User.findOne({email})

    if(user) {
        const error = new Error("User already exists");
        error.status = 404
        throw error
    }

    user = new User(data);
    const token = JWT.sign({id: user._id}, jwtSecret)

    await user.save();

    return(data={
        userId: user._id,
        email: user.email, 
        name: user.name, 
        token
    })

    


}

module.exports={
    signUp,
}