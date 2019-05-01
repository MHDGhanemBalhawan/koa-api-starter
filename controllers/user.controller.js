const UtilService = require("../services/util.service");
const JwtService = require("../services/jwt.service");
module.exports = {
  /**
   * @api {post} signup Signup with unique email and password
   * @apiGroup Users
   * @apiName signupUser
   * @apiParam {String} [email] user must enter email
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
  }
};
