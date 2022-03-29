const { addbook } = require('../controllers/books/addbook');
const { showAllBooks, updateBooksDetails, deleteBooks, bookById } = require('../controllers/books/books.controller');
const { bookPurchase } = require('../controllers/books/purchaseBook.controller');

const bookRouter = require('express').Router()


// to get all the user 
bookRouter.get('/all_books', showAllBooks)

// to add books
bookRouter.post('/add_book', addbook)

// single book detail by id 
bookRouter.get("/book_by_id/:id", bookById)

// to update books
bookRouter.post('/update_book/:id', updateBooksDetails)

// delete routes
bookRouter.get('/delete_book/:id', deleteBooks)

// book purchase 
bookRouter.post('/book_purchase/:id', bookPurchase)



module.exports = bookRouter;