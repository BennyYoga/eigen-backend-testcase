const knex = require("knex");

const connection = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "be-techtical-test",
  },
});

if (connection) {
  console.log("Database connected");
} else {
  console.log("Database connection failed");
}

module.exports = connection;
