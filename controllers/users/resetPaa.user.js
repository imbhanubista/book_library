const ForgotPassword = require('../../models/forgotPass.model')
const Users = require('../../models/users.models')
const bcrypt = require('bcrypt')
const { updatePassValidator } = require('../../helpers/validator.helper')

exports.resetPass = async (req,res)=>{
    // let {email} = req.query
    let {code,password,cpassword,email} = req.body
    let validPass = updatePassValidator.validate({
        password,
        cpassword
    })
   
    let forgotdata = await ForgotPassword.findOne({
        $and : [
            {email},
            {code}
        ]
    })
    if (validPass.error){
        res.json({
            type:"error",
            msg: validPass.error.details[0].message
        })
    }
    
    else if(forgotdata === null){
        res.json({
            type:"error",
            msg:"Input code is wrong",
        })
    }
    else if (password!==cpassword){
        res.json({
            type  : "error",
            msg  : "Repeat password not matched"
        })
    }
    else{
    let registerUser = await Users.findOne({email})
        if(registerUser !==null){
            try{
    let hashpassword = await bcrypt.hash(password, 10)
                let updateData = await Users.updateOne({email},{
                    $set:{
                        password : hashpassword
                    }
                })
                res.json({
                    type:"Success",
                    msg:"Password Updated"
                })
            }
        
            catch(err){
                    res.json({
                        type: "error",
                        msg: err.message
                    })
            }
        }
    }
}