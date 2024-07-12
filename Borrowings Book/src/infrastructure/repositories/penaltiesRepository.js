const db = require("../../library/database");
const { format } = require("date-fns");

async function setPenalties(penalties) {
  return db("penalties").insert(penalties);
}

async function isPenalties(member_id) {
  const penalties = await db("penalties")
    .select("*")
    .where("member_id", member_id)
    .orderBy("start_date", "desc")
    .first();

  let currentDate = new Date();
  if (!penalties) {
        return false;
  } else {
    if (penalties.start_date < currentDate) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { setPenalties, isPenalties };
