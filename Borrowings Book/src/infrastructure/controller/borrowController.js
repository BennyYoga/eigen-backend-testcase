const responseMessage = require("../utils/response");
const borrowRepository = require("../repositories/borrowRepository");
const bookRepository = require("../repositories/bookRepository");
const penaltiesRepository = require("../repositories/penaltiesRepository"); 
const { format, addDays, parseISO } = require("date-fns");

const borrowService = require("../../domain/service/borrowService");
const penaltiesService = require("../../domain/service/penaltiesService");

const BorrowService = new borrowService(borrowRepository, bookRepository);
const PenaltiesService = new penaltiesService(penaltiesRepository);

async function borrowBook(req, res){
    try{
        const book_id = req.body.book_id;
        const member_id = req.body.member_id;

        if((await bookRepository.getBookDetail(book_id)).length == 0){
            responseMessage.responseMessage(res, 400, "Book not found");
        }
        else if((await borrowRepository.getBookByMember(member_id)).length == 2){
            responseMessage.responseMessage(res, 400, "Cannot borrow the book, Member already borrowed 2 books");
        }
        else if(await penaltiesRepository.isPenalties(member_id)){
            responseMessage.responseMessage(res, 400, 'Cannot borrow the book, Member has penalties');
        }
        else if(!await bookRepository.isHaveStock(book_id)){
            responseMessage.responseMessage(res, 400, "Cannot borrow the book, Book out of stock");
        }
        else{
            BorrowService.borrowBook(book_id, member_id);
            responseMessage.responseMessage(res, 200, "Borrow Success");
        }
    }
    catch(err){
        responseMessage.responseMessage(res, 500, err.message);
    }
}

async function returnBook(req, res){
    try {
        const book_id = req.body.book_id;
        const member_id = req.body.member_id;
    
        let borrowedBook = await borrowRepository.getBookNotReturn(book_id, member_id);        
        if (borrowedBook.length == 0) {
            responseMessage.responseMessage(res, 400, "Data not found");
        } else {
            borrowedBook = borrowedBook[0];
            
            let currentDate = new Date();            
            let borrow_date = new Date(borrowedBook.borrow_date);
            borrow_date = addDays(borrow_date, 7);
            console.log(borrowedBook.borrow_date, currentDate);

            if (borrow_date  < currentDate) {
                PenaltiesService.addPenalty(member_id);
                BorrowService.returnBook(book_id, member_id);
                responseMessage.responseMessage(res, 200, "Book returned late, penalties applied");
            } else {
                BorrowService.returnBook(book_id, member_id);
                responseMessage.responseMessage(res, 200, "Book returned");
            }
        }
    } catch (error) {
        console.error("Error:", error);
        responseMessage.responseMessage(res, 500, "Internal Server Error");
    }
    
}

module.exports = { borrowBook, returnBook };
    