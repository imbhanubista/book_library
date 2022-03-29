const { string } = require('joi')
const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
    book_id : String,
    user_id : String,
    purchase_date : Date
})

// model create 
const purchase = mongoose.model("Book Purchase", purchaseSchema)

module.exports = purchase