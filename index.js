require("dotenv").config();
const app = require("./app");
const connectionWithDB = require("./config/database");

const PORT = process.env.PORT || 4004;

// db connection
connectionWithDB();

// server start
app.listen(PORT, (req, res) => {
  console.log(
    `Server started listening on port :- ${PORT}   ............!!!!!!`
  );
});
