const db = require('../../library/database');


async function getAllBook() {
    return db('books').select('*').where('stock', '>', 0);
}

async function getBookDetail(book_id) {
    return db('books').select('*').where('code', book_id);
}

async function setMinusStock(book_id) {
    return db('books').where('code', book_id).decrement('stock', 1);
}

async function isHaveStock(book_id) {
    const stock = await db('books').where('code', book_id);
    if (stock[0].stock > 0) {
        return true;
    } else {
        return false;
    }
}

async function setPlusStock(book_id) {
    return db('books').where('code', book_id).increment('stock', 1);
}

module.exports = {
    getAllBook,
    getBookDetail,
    setMinusStock,
    setPlusStock,
    isHaveStock
}