const Users = require('../../models/users.models')
const ForgotPassword = require('../../models/forgotPass.model')

// for code generator
const {nanoid} = require('nanoid')

exports.forgotPass =async(req,res)=>{
    let {email} = req.query
    let code =  nanoid(4)
    // console.log(code);
    let userEmail = await Users.findOne({email})
   
    // to check email exist or not 
    if(userEmail !== null){
        try{
                let forgotDB = await new ForgotPassword({
                    email,
                    code 
                }).save()
                res.json({
                    type:"error",
                    msg:"Reset code is sent to" + email
                })
        }
        catch(err){
res.json({
    type:"error",
    msg: err.message
})
        }
    }
    else{
        res.json({
            type:"error",
            msg:"Email doesn't Exist"
        })
    }

}