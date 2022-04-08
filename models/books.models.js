const mongoose = require('mongoose')
const Users = require('./users.models')

// to create schema

const booksSchema = mongoose.Schema({
    bname: String,
    author: String,
    publication: String,
    edition: String,
    category: String,
    cover_photo : String,
    created_by : {type:String, ref:Users}
})

// to create model 
const Books = mongoose.model("Books", booksSchema)

// to export 
module.exports = Books