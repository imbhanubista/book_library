const purchase = require('../../models/purchase.model')
const Books = require('../../models/books.models')
const Purchase = require('../../models/purchase.model')
const jwt = require('jsonwebtoken')


exports.bookPurchase = async(req,res)=>{
    let token = req.body.token
    let {id} = req.params
    try {
            let tokenData = jwt.verify(token, process.env.JWT_SECRET)
            let bookId = await Books.findOne({_id:id})
            let existList = await Purchase.findOne({
                $and:[
                    
                        {user_id: tokenData._id},
                        {book_id: bookId._id}
                ]
            })
            if(bookId ===null){
                res.json({
                    type:"error",
                    msg:"Book doesn't exist"
                })
            } 
            else if(existList !==null){
                res.json({
                    type:"error",
                    msg:"User already purchased this book"
                })
            }

            else{
            let bookDetails = await new Purchase({
                user_id: tokenData._id,
                book_id: bookId._id,
                purchase_date: new Date()
                
            }).save()
            res.json({
                type:"Success",
                msg:"Purchase Success",
                data:{
                    bookDetails
                }
            })
    }}
    catch(err){
        res.json({
            type:"error",
            msg: err.message
        })
    }
}