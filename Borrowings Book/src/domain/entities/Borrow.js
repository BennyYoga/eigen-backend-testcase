class Borrow {
    constructor({ book_id, member_id, start_date, return_date}) {
        this.book_id = book_id;
        this.member_id = member_id;
        this.borrow_Date = start_date;
        this.return_date = return_date;
    }
}

module.exports = Borrow;