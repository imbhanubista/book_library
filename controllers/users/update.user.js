const Users = require('../../models/users.models')
const jwt = require("jsonwebtoken")
exports.UpdateUser =async(req,res)=>{
    let {name,email,age,sex,address,phone,token} = req.body
    // let {id} = req.params
    let tokendata = jwt.verify(token,process.env.JWT_SECRET)
    console.log(tokendata)
    let toUpdateData = await Users.updateOne({_id:tokendata._id},{
        $set:{
            name: name,
            email:email,
            age:age,
            sex:sex,
            address: address,
            phone:phone,
            
        }
    })

    res.json({
        type:"Success",
        msg:"Updated Successfully"
    })

}