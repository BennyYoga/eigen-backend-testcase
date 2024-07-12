const db = require('../../library/database');

async function getAllMember(){
    return db('members').select('*');
}

async function getCountBookMember(){
    rows = await db.raw(
        `SELECT a.code, a.name, COUNT(b.id) as book_borrowed FROM members a join borrow b on a.code = b.member_id where b.return_date IS NULL GROUP BY a.code, a.name`
    );
    return rows[0];
}

module.exports = {getAllMember, getCountBookMember};