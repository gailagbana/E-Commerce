require("dotenv").config();
const glob = require("glob");
const { resolve } = require("path");

const mongoose = require("mongoose");

const { APP_DB_URI } = process.env;

module.exports.connect = () => {
  try {
    mongoose.connect(
      APP_DB_URI,
      {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, data) => {
        if (err) {
          console.log(`Could not connect to database, ${err}`);
          return;
        }
        console.log(`Database connection established.`);
      }
    );
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
};

module.exports.loadModels = () => {
  let basePath = resolve(__dirname, "../models/");
  let files = glob.sync("*.js", { cwd: basePath });
  files.forEach((file) => {
    if (file.toLocaleLowerCase().includes("index")) return;
    require(resolve(basePath, file));
  });
};
