const {
    signUp
} = require("../middlewares/auth.middleware")


const signInController=async(req, res, next)=>{
    
    const {email, password, name} = req.body;
    
    const signInService = await signUp({email, password, name});
    return res.json(signInService);
}

module.exports={
    signInController
}