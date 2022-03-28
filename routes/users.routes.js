const { addbook } = require('../controllers/books/addbook');
const { deleteUsers } = require('../controllers/users/delete.user');
const { forgotPass } = require('../controllers/users/forgotPass.user');
const { logIn } = require('../controllers/users/login.users');
const { createUsers } = require('../controllers/users/signup.user');
const { UpdateUser } = require('../controllers/users/update.user');
const {resetPass} = require('../controllers/users/resetPaa.user')

const router = require('express').Router()

// to use the signup 
router.post('/signup', createUsers)

// to use the login
router.post('/login', logIn)

// to use update router
router.post('/update_user', UpdateUser)

// to use delete router
router.get('/delete_user', deleteUsers)

// forgot password route
router.post('/forgot_pass', forgotPass)

// reset password 
router.post('/reset', resetPass)

// for book route
// router.post('/add_book', addbook)



// exporting router
module.exports = router;