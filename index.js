const { dotenv } = require("dotenv");
const express = require("express");
const cors = require("cors");

let { connect, loadModels } = require("./src/models");
let apiRoutes = require("./src/routes/index");

const { PORT } = process.env;

connect();
loadModels();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", apiRoutes);

/*app.get("/public", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});
*/

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
