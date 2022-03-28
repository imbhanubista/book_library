const purchase = require('../../models/purchase.model')
const jwt = require('jsonwebtoken')


exports.bookPurchase = async(req,res)=>{
    let {token, id} = req.body
    try {
            let tokenData = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){

    }
}