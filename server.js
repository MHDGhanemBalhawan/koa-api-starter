const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-parser");
const _ = require("lodash");
const serve = require("koa-static");

const router = require("./routes");

const app = new Koa();
const PORT = 4000;

const db = require("./models");
db.sequelize
  .sync({})
  .then(() => console.log("model synced"))
  .catch(err => console.log(err));

app.context.db = db;
app.use(bodyParser());
app.use(router.routes());
app.use(serve(__dirname + "/public"));
// if (process.env.NODE_ENV !== "production") {
//   app.use(serve(__dirname + "/public"));
// }
app.getMaxListeners("/", (request, response) => {
  response.render(/index);
});

app.listen(process.env.PORT || PORT);
console.log("Server is listening to port " + PORT);
