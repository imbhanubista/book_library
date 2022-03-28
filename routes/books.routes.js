const { addbook } = require('../controllers/books/addbook');
const { showAllBooks, updateBooksDetails, deleteBooks } = require('../controllers/books/books.controller');

const bookRouter = require('express').Router()


// to get all the user 
bookRouter.get('/all_books', showAllBooks)

// to add books
bookRouter.post('/add_book', addbook)

// to update books
bookRouter.post('/update_book/:id', updateBooksDetails)

// delete routes
bookRouter.get('/delete_book/:id', deleteBooks)






module.exports = bookRouter;