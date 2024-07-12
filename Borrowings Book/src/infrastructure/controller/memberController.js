
const responseMessage = require("../utils/response");
const memberRepository = require("../repositories/memberRepository");

async function showAllMember(req, res){
    try {
        const members = await memberRepository.getCountBookMember();
        responseMessage.responseData(res, 200, members);
    } catch (err) {
        responseMessage.responseMessage(res, 500, "Internal Server Error");
    }
}

module.exports = { showAllMember };