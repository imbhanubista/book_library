const mongoose = require('mongoose')

// to create schema

const booksSchema = mongoose.Schema({
    bname: String,
    author: String,
    publication: String,
    edition: String,
    category: String,
    cover_photo : String,
    created_by : String
    
})

// to create model 
const Books = mongoose.model("Books", booksSchema)

// to export 
module.exports = Books