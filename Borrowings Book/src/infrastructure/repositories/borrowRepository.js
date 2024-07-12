const db = require("../../library/database");
const { format } = require("date-fns");

async function getAllBorrow() {
  return db("borrow").select("*");
}

async function getBookNotReturn(book_id, member_id) {
  return db("borrow")
    .select("*")
    .where({ book_id: book_id, member_id: member_id, return_date: null });
}

async function getBookByMember(member_id) {
  return db("borrow")
    .select("*")
    .where({ member_id: member_id, return_date: null });
}

async function setBorrowBook(borrow) {
  return db("borrow").insert(borrow);
}

async function setReturnBook(returned) {
  let date = new Date();
  date = format(date, 'yyyy-MM-dd HH:mm:ss');
  return db("borrow")
    .where('member_id', returned.member_id)
    .andWhere('book_id', returned.book_id)
    .update({ return_date: date });
}

module.exports = {
  getAllBorrow,
  getBookNotReturn,
  setBorrowBook,
  setReturnBook,
  getBookByMember,
};
