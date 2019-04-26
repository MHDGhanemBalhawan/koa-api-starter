const UtilService = require("../services/util.service");
const JwtService = require("../services/jwt.service");
module.exports = {
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
