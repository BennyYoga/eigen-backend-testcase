const responseMessage = require("../utils/response");
const bookRepository = require("../repositories/bookRepository");

async function showAllBook(req, res){
    try {
        const books = await bookRepository.getAllBook();
        responseMessage.responseData(res, 200, books);
    } catch (err) {
        responseMessage.responseMessage(res, 500, "Internal Server Error");
    }
}

module.exports = { showAllBook };