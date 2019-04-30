module.exports = {
  /**
   * @api {post} /jobs
   * @apiGroup Jobs
   * @apiName jobs
   * @apiParam {String} [title] user must enter the job title
   * @apiParam {Number} [CompanyId] user must provide CompanyId
   * @apiParamExample {String} Request Params:
   * {
   * "title" : "Node.js Developer",
   * "CompanyId": 1
   * }
   * @apiSuccess {String} Msg Job created successfully
   *
   * @apiSuccessExample  {JSON} Signup-Success-Response :
   * http/1.1 200ok
   * {
   * msg: "Job created successfully"
   * }
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/jobs
   * @apiDescription User can create new jobs
   * @apiHeader {string} Authorization JWT Authorization Header
   * @apiHeaderExample {JSON} Request Authorization Header
   * {
   *  "Authorization" : "HLGJLKIT4LJDF99JDFJDFFK"
   * }
   */
  async create(ctx) {
    try {
      if (!ctx.request.body.title) {
        ctx.throw(400, "please provide the job title");
      }
      if (!ctx.request.body.CompanyId) {
        ctx.throw(400, "please provide company id");
      }
      ctx.body = await ctx.db.Job.create({
        title: ctx.request.body.title,
        CompanyId: ctx.request.body.CompanyId
      });
      ctx.body = "Job created successfully";
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  /**
   * @api {get} /jobs
   * @apiGroup Jobs
   * @apiName Getjobs
   * @apiSuccess {Object[]} Job List of Jobs with candidates
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/jobs
   * @apiDescription User can view all jobs
   * @apiHeader {string} Authorization JWT Authorization Header
   * @apiHeaderExample {JSON} Request Authorization Header
   * {
   *  "Authorization" : "HLGJLKIT4LJDF99JDFJDFFK"
   * }
   */
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Job.findAll({
        include: [{ model: ctx.db.Candidate }]
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
