const Books = require('../../models/books.models')
const Users = require('../../models/users.models')
const jwt = require('jsonwebtoken')
const { addBookVerify } = require('../../helpers/validator.helper')


// start of Find ALl Books
exports.showAllBooks = async (req,res)=>{
    let token = req.body.token
    try{
    let tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
            let allBooks = await Books.find({})
            res.json({
                type:"error",
                msg:"Success",
                data:{
                    allBooks
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
// end of find all books

// start of update all books
exports.updateBooksDetails = async (req,res)=>{
    let {token,bname,author,edition,category,publication} = req.body
    let {id} = req.params

    try{
        let tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
        let bookValidate = addBookVerify.validate({
            bname,
            author,
            edition,
            category,
            publication,
            id
        })
    if (bookValidate.error){
        res.json({
            type:"error",
            msg: bookValidate.error.details[0].message
        })
    } 
    else{
        let toUpdateBook = await Books.updateOne({_id:id},{
            $set:{
                bname: bname,
                author:author,
                edition:edition,
                category: category,
                publication: publication,
                
            }
        })
        res.json({
            type:"success",
            msg:"Updated Successfully"
        })
    }}
    catch(err){
        res.json({
            type:"error",
            msg: err.message
        })
    }
}
// end of book update function

// start of book delete function
exports.deleteBooks = async (req,res)=>{
    let token = req.body.token
    let {id} = req.params

    try{
        let deletetoken = jwt.verify(token, process.env.JWT_SECRET)
        if(Users.isAdmin ===false){
            res.json({
                type:"error",
                msg:"Only admin are eligible for this task"
            })
        }
        else{
        let dataToDelete = await Books.deleteOne({_id:id})
        res.json({
            type:"success",
            msg:"Successfully Deleted"
        })
    }}
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }

}

// end of book delete function


// start of single book by id 

exports.bookById = async(req,res)=>{
    let {id} = req.params
    let token = req.body.token

    try{
            let tokenData = jwt.verify(token, process.env.JWT_SECRET)

            let bookDetailBYId = await Books.findOne({_id:id})
            if(bookDetailBYId === null){
                res.json({
                    type:"error",
                    msg:"Book id doesn't matched"
                })
            }
            else{
            res.json({
                type:"success",
                msg:"Book found",
                data:{
                    bookDetailBYId
                }
            })
    }}
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }
}

// end of single book by id 
