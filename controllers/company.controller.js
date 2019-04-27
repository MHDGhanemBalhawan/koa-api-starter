module.exports = {
  /**
   * @api {post} /companies
   * @apiGroup Companies
   * @apiName CreateCompanies
   * @apiParam {String} [name] user must enter company name
   * @apiParam {String} [city] user must provide city
   * @apiParam {String} [address] user must enter address
   * @apiParam {Number} [UserId] user must provide UserId
   * @apiParamExample {String} Request Params:
   * {
   * "name": "MSN",
   * "city": "New York",
   * "address": "1243 John Morris Road",
   * "email": "molly@gmail.com",
   * "UserId": 4,
   * }
   * @apiSuccess {String} Msg Account created successfully
   *
   * @apiSuccessExample  {JSON} Signup-Success-Response :
   * http/1.1 200ok
   * {
   * msg: "Account created successfully"
   * }
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/companies
   * @apiDescription User can create new companies
   * @apiHeader {string} Authorization JWT Authorization Header
   * @apiHeaderExample {JSON} Request Authorization Header
   * {
   *  "Authorization" : "HLGJLKIT4LJDF99JDFJDFFK"
   * }
   *
   */
  async create(ctx) {
    try {
      await ctx.db.Company.create({
        name: ctx.request.body.name,
        city: ctx.request.body.city,
        address: ctx.request.body.address,
        email: ctx.request.body.email,
        UserId: ctx.state.user
      });
      ctx.body = "Account created successfully";
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  /**
   * @api {get} /companies
   * @apiGroup Companies
   * @apiName FindCompanies
   * @apiSuccess {Object} Company list with companies for the logged user
   *
   * @apiSuccessExample  {JSON} find-Success-Response :
   * {
   * "name": "MSN",
   * "city": "New York",
   * "address": "1243 John Morris Road",
   * "email": "molly@gmail.com",
   * "UserId": 4,
   * "job" : []
   * }
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/companies
   * @apiDescription Logged in user can view all companies
   * @apiHeader {string} Authorization JWT Authorization Header
   * @apiHeaderExample {JSON} Request Authorization Header
   * {
   *  "Authorization" : "HLGJLKIT4LJDF99JDFJDFFK"
   * }
   *
   */
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Company.findAll({
        where: { UserId: ctx.state.user },
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
      const company = await ctx.db.Company.findOne({
        where: { id: ctx.params.id }
      });
      if (!company) {
        ctx.throw(404, "Company id is invalid");
      }
      ctx.body = company;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      const results = await ctx.db.Company.destroy({
        where: { id: ctx.params.id }
      });
      results === 0
        ? ctx.throw(500, "invalid Id provided")
        : (ctx.body = `compnay with id ${ctx.params.id} is deleted`);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx) {
    try {
      const results = await ctx.db.Company.update(
        {
          name: ctx.request.body.name,
          city: ctx.request.body.city,
          address: ctx.request.body.address
        },
        { where: { id: ctx.params.id } }
      );
      results === 0
        ? ctx.throw(500, "invalid Id provided")
        : (ctx.body = `compnay with id ${ctx.params.id} is updated`);
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
