module.exports = {
  /**
   * @api {post} /applications
   * @apiGroup Applications
   * @apiName CreateApplications
   * @apiParam {String} [firstName] user must provice first name
   * @apiParam {String}[lastName] user must provide last name
   * @apiParam {String} [address] user can enter an address
   * @apiParam {Number}[JobId] user must provide jobId
   * @apiParam {String}[email] user must provide email address
   * @apiParamExample {String} Request Params:
   * {
   * "firstName": "Jacky",
   * "lastName": "Smith",
   * "address": "sdfasdf",
   * "jobId": 1,
   * "email": "jacky.smith@gmail.com"
   * }
   * @apiSuccess {Object} Application Anewly created Application object
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/applications
   * @apiDescription Logged in user can create new applications and apply for jobs
   * @apiHeader {string} Authorization JWT Authorization Header
   * @apiHeaderExample {JSON} Request Authorization Header
   * {
   *  "Authorization" : "HLGJLKIT4LJDF99JDFJDFFK"
   * }
   */
  async create(ctx) {
    try {
      if (!ctx.request.body.firstName) {
        ctx.throw(400, "please provide first name");
      }
      if (!ctx.request.body.lastName) {
        ctx.throw(400, "please provide last name");
      }
      if (!ctx.request.body.email) {
        ctx.throw(400, "please provide email");
      }
      const candidate = await ctx.db.Candidate.create({
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        address: ctx.request.body.address,
        email: ctx.request.body.email,
        UserId: ctx.state.user
      });

      ctx.body = await ctx.db.Application.create({
        JobId: ctx.request.body.jobId,
        CandidateId: candidate.id
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
