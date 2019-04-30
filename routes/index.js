const Router = require("koa-router");
const router = new Router();
const {
  CompanyController,
  JobController,
  ApplicationController,
  UserController
} = require("../controllers");
const isAuthenticated = require("../policies/isAuthenticated");

router.post("/companies", isAuthenticated, CompanyController.create);
router.get("/companies", CompanyController.find);
router.get("/companies/:id", isAuthenticated, CompanyController.findOne);
router.delete("/companies/:id", isAuthenticated, CompanyController.destroy);
router.put("/companies/:id", isAuthenticated, CompanyController.update);

//Job route
router.post("/jobs", isAuthenticated, JobController.create);
router.get("/jobs", JobController.find);

//Application route
router.post("/applications", isAuthenticated, ApplicationController.create);

//User route
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
module.exports = router;
