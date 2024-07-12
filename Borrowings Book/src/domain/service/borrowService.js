const Borrow = require("../entities/Borrow");
const borrowRepository = require("../../infrastructure/repositories/borrowRepository");
const bookRepository = require("../../infrastructure/repositories/bookRepository");

class BorrowService {
    constructor() {
        this.borrowRepository = borrowRepository;
        this.bookRepository = bookRepository;
    }
    
    async borrowBook(bookId, memberId) {
        let borrow = new Borrow({
            book_id: bookId,
            member_id: memberId,
            borrow_Date: new Date(),
            end_date: null,
        });
        
        this.bookRepository.setMinusStock(bookId);
        this.borrowRepository.setBorrowBook(borrow);
    }

    async returnBook(bookId, memberId) {
        let getNewBorrowedBook = await this.borrowRepository.getBookNotReturn(bookId, memberId);
        getNewBorrowedBook = getNewBorrowedBook[0];
        let returned = new Borrow({
            book_id: getNewBorrowedBook.book_id,
            member_id: getNewBorrowedBook.member_id,
            borrow_Date: getNewBorrowedBook.start_date,
        });
        this.borrowRepository.setReturnBook(returned);
        this.bookRepository.setPlusStock(bookId);
    }
}

module.exports = BorrowService;