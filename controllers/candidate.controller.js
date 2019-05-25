module.exports = {
  /**
   * @api {post} candidate
   * @apiGroup Candidate
   * @apiName CreateCandidate
   * @apiParam {String} [firstName] user must provice first name
   * @apiParam {String}[lastName] user must provide last name
   * @apiParam {String} [address] user can enter an address
   * @apiParam {String}[email] user must provide email address
   * @apiParamExample {String} Request Params:
   * {
   * "firstName": "Jacky",
   * "lastName": "Smith",
   * "address": "sdfasdf",
   * "email": "jacky.smith@gmail.com"
   * }
   * @apiSuccess {Object} Candidate A newly created Candidate object
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/candidate
   * @apiDescription Logged in user can create new candidate and apply for jobs
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
      ctx.body = candidate;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Candidate.findAll({
        include: [
          {
            model: ctx.db.Job
          }
        ]
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findOne(ctx) {
    try {
      const candidate = await ctx.db.Candidate.findOne({
        where: { id: ctx.params.id },
        include: [
          {
            model: ctx.db.Application
          }
        ]
      });
      if (!candidate) {
        ctx.throw(404, "Candidate id is invalid");
      }
      ctx.body = candidate;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      const results = await ctx.db.Candidate.destroy({
        where: { id: ctx.params.id }
      });
      results === 0
        ? ctx.throw(500, "invalid Id provided")
        : (ctx.body = `Candidate with id ${ctx.params.id} is deleted`);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx) {
    try {
      const results = await ctx.db.Candidate.update(
        {
          firstName: ctx.request.body.firstName,
          lastName: ctx.request.body.lastName,
          address: ctx.request.body.address,
          email: ctx.request.body.email
        },
        { where: { id: ctx.params.id } }
      );
      results === 0
        ? ctx.throw(500, "invalid Id provided")
        : (ctx.body = `Candidate with id ${ctx.params.id} is updated`);
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
