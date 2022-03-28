const { logValidator } = require("../../helpers/validator.helper")
const Users = require("../../models/users.models")
const { existEmail, passNotMatch, loggedIn } = require("../../responses/common")
const bcrypt = require('bcrypt')
const { mailMe } = require("../../helpers/mail.helper")
const jwt = require("jsonwebtoken")

exports.logIn = async(req,res)=>{
    let {email,password} = req.body

    let loginValid = logValidator.validate({
        email,
        password
    })
    if(loginValid.error){
        res.json({
            type:"error",
            msg: loginValid.error.details[0].message
        })
    }
    else{
        let registerUser = await Users.findOne({email})
        if(registerUser === null){
            res.json({
                type:"error",
                msg: existEmail
            })
        }
        else if (!await bcrypt.compare(password, registerUser.password)){
            res.json({
                type:"error",
                msg:passNotMatch
            })
        }
        else{
            try{
                mailMe(email, "Logged In", "Somebody logged in to your account")
                let token = jwt.sign({
                    email : registerUser.email,
                    _id : registerUser._id
                },process.env.JWT_SECRET,{
                    expiresIn : "1d"
                })
                res.json({
                type:"success",
                msg:loggedIn,
                data:{
                    name: registerUser.name,
                    email: registerUser.email,
                    token
                }

            })
            }
            catch(err){
                res.json({
                    type:"error",
                    msg: err.message
                })
            }
        }
    }
}