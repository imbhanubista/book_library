const Users = require('../../models/users.models')
const ForgotPassword = require('../../models/forgotPass.model')

// for code generator
const {customAlphabet} = require('nanoid')
const { mailMe } = require('../../helpers/mail.helper')

exports.forgotPass =async(req,res)=>{
    let {email} = req.body
    let code =  customAlphabet("0123456789",4)()
    // console.log(code);
    let userEmail = await Users.findOne({email})
    console.log(code)
   
    // to check email exist or not 
    if(userEmail !== null){
        try{
                let forgotDB = await new ForgotPassword({
                    email,
                    code 
                }).save()
                mailMe(email, "Reset Password!!", "Your reset code is  "+code)
                res.json({
                    type:"success",
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