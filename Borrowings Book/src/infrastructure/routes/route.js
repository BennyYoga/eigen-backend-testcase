const { showAllMember } = require('../controller/memberController');
const { showAllBook } = require('../controller/booksController');
const { borrowBook, returnBook } = require('../controller/borrowController');
const route = require('express').Router();


//Member
route.get('/members', showAllMember);

//Books
route.get('/books', showAllBook);

//Borrow Book
route.post('/borrow', borrowBook);

//Return Book
route.patch('/return', returnBook);

module.exports = route;