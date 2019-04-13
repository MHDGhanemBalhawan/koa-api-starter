const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-parser");

const app = new Koa();
const PORT = 4000;

const db = require("./models");
db.sequelize
  .sync()
  .then(() => console.log("model synced"))
  .catch(err => console.log(err));
app.listen(PORT);
console.log("Server is listening to port " + PORT);
