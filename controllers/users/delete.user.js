const Users = require('../../models/users.models')

exports.deleteUsers = async(req,res)=>{
    let {id} = req.query
    let deleteUser = await Users.deleteOne({_id:id})
    res.json({
        type:"error",
        msg:"Successfully deleted!!!"
    })
    
}