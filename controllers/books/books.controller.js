const Books = require('../../models/books.models')
const Users = require('../../models/users.models')
const jwt = require('jsonwebtoken')
const { addBookVerify } = require('../../helpers/validator.helper')
const purchase = require('../../models/purchase.model')
const res = require('express/lib/response')


// start of Find ALl Books
exports.showAllBooks = async (req,res)=>{
    let token = req.body.token
    try{
    let tokenVerify = jwt.verify(token, process.env.JWT_SECRET)
            let allBooks = await Books.find({}).lean()
            let user = []
            for(let items of allBooks){
                let data = await Users.findOne({_id:items.created_by})
                 user = [...user, {...items, name: data.name}]
            }
            res.json({
                type:"success",
                msg:"Success",
                data:{
                    allBooks: user
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
        let userAdmin = await Users.findOne({_id:deletetoken._id})
        if(userAdmin.isAdmin === false){
            res.json({
                type:"error",
                msg:"Only admin can perform this task"
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

// to get list of purchase books 
exports.purchasedBook = async(req,res)=>{
    let token = req.body.token
   try{
    let tokenData = jwt.verify(token, process.env.JWT_SECRET)
    let allBooksP = await purchase.find({}).lean()

    // to get books details from book id
    let allBooksD = []
    for(let key of allBooksP){
        let detailData = await Books.findOne({_id:key.book_id}).lean()
        console.log(detailData,'booooood')
        allBooksD= [...allBooksD,{...detailData,...key}]
    }
    let particularData = await purchase.find({user_id:tokenData._id}).lean()
    // console.log(particularData)
    res.json({
        type :"success",
        msg:"List of Books",
        data:{
            allBooksP:allBooksD
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
