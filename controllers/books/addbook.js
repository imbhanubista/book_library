const Books = require('../../models/books.models')
const Users = require('../../models/users.models')
const jwt = require('jsonwebtoken')
const { addBookVerify } = require('../../helpers/validator.helper')

exports.addbook = async(req,res)=>{
let {bname,author,edition,publication,category,token} = req.body
try{
    let tokenData = jwt.verify (token, process.env.JWT_SECRET)
    // let bookAddedBy = await Users.findOne({email})
    // to validate books fields
    let bookValidate = addBookVerify.validate({
        bname,
        author,
        edition,
        category,
        publication
    })
    
    if(bookValidate.error){
        res.json({
            type:"error",
            msg: bookValidate.error.details[0].message
        })
    }
    else if (!req.files){
        res.json({
            type:"error",
            msg:"No File Found"
        })
    }
     else {
         let file = req.files.coverPic
         let path = "/images/bookCover" + file.name

         file.mv("public"+path, (err)=>{})

        let booksData = await new Books({
            bname,
            author,
            edition,
            publication,
            category,
            cover_photo:path,
            created_by : tokenData._id
            // Verified : bookAddedBy.name

        }).save()
        res.json({
            type:"Success",
            msg:"Book added successfully", 
            data:{
                booksData,
                cover_photo: path
            }
        })
    }
}
catch(err){
res.json({
    type:"error",
    msg:err.message
})
}
}