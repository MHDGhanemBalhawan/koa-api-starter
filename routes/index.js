const Router = require("koa-router");
const router = new Router();
const {
  CompanyController,
  JobController,
  ApplicationController,
  UserController,
  CandidateController
} = require("../controllers");
//const isAuthenticated = require("../policies/isAuthenticated");

router.post("/companies", CompanyController.create);
router.get("/companies", CompanyController.find);
router.get("/companies/:id", CompanyController.findOne);
router.delete("/companies/:id", CompanyController.destroy);
router.put("/companies/:id", CompanyController.update);

//Job route
router.post("/jobs", JobController.create);
router.get("/jobs", JobController.find);

//Application route
router.post("/applications", ApplicationController.create);
router.get("/applications", ApplicationController.find);
router.get("/applications/:id", ApplicationController.findOne);
router.delete("/applications/:id", ApplicationController.destroy);
router.put("/applications/:id", ApplicationController.update);

//User route
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
module.exports = router;

//Candidate route
router.post("/candidates", CandidateController.create);
router.get("/candidates", CandidateController.find);
router.get("/candidates/:id", CandidateController.findOne);
router.delete("/candidates/:id", CandidateController.destroy);
router.put("/candidates/:id", CandidateController.update);
