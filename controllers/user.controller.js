const UtilService = require("../services/util.service");
const JwtService = require("../services/jwt.service");
module.exports = {
  /**
   * @api {post} /signup Signup users
   * @apiGroup Users
   * @apiName signupUser
   * @apiParam {String} [email] user must enter a nique email
   * @apiParam {String} [password] user must enter password
   * @apiParamExample {String} Request Params:
   * {
   * "email" : "test@email.com",
   * "password" : "password123"
   * }
   * @apiSuccess {String} Msg Signup successfully
   *
   * @apiSuccessExample  {JSON} Signup-Success-Response :
   * http/1.1 200ok
   * {
   * msg: "Signup successfully"
   * }
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/signup
   * @apiDescription User can create new account
   */
  async signup(ctx) {
    let { email, password } = ctx.request.body;
    try {
      if (!email) {
        ctx.throw(400, "please provide email");
      }
      if (!password) {
        ctx.throw(400, "please provide password");
      }
      const encryptedPassword = await UtilService.hashPassword(password);
      await ctx.db.User.create({
        email,
        password: encryptedPassword
      });
      ctx.body = "Signup successfully";
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  /**
   * @api {post} login
   * @apiGroup Users
   * @apiName loginUser
   * @apiParam {String} [email] user must enter email
   * @apiParam {String} [password] user must enter password
   * @apiParamExample {String} Request Params:
   * {
   * "email" : "test@email.com",
   * "password" : "password123"
   * }
   * @apiSuccess {Object} Token  A JSON web token to access protected routes
   * @apiSuccessExample {JSON} Login Response:
   * {
   * "token" : "LKLJLAKJKNA8097087JHLKASNDLKFASD"
   * }
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:4000/login
   * @apiDescription User can login to the system
   *
   */
  async login(ctx) {
    try {
      let { email, password } = ctx.request.body;

      if (!email) {
        ctx.throw(400, "please provide email");
      }
      if (!password) {
        ctx.throw(400, "please provide password");
      }
      const user = await ctx.db.User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        ctx.throw(500, "unable to process the request");
      }
      const matched = UtilService.comparePassword(password, user.password);
      if (matched) {
        const token = JwtService.issue(
          {
            payload: {
              user: user.id
            }
          },
          "1 day"
        );
        ctx.body = { token };
      } else {
        ctx.throw(500, "Invalid password");
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.User.findAll({
        include: [
          {
            model: ctx.db.Candidate
          }
        ]
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findOne(ctx) {
    try {
      const candidate = await ctx.db.User.findOne({
        where: { id: ctx.params.id },
        include: [
          {
            model: ctx.db.Candidate
          }
        ]
      });
      if (!candidate) {
        ctx.throw(404, "User id is invalid");
      }
      ctx.body = User;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      const results = await ctx.db.User.destroy({
        where: { id: ctx.params.id }
      });
      results === 0
        ? ctx.throw(500, "invalid Id provided")
        : (ctx.body = `User with id ${ctx.params.id} is deleted`);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx) {
    try {
      const results = await ctx.db.User.update(
        {
          email: ctx.request.body.email,
          password: ctx.request.body.password
        },
        { where: { id: ctx.params.id } }
      );
      results === 0
        ? ctx.throw(500, "invalid Id provided")
        : (ctx.body = `User with id ${ctx.params.id} is updated`);
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
