module.exports = {
  async signup(ctx) {
    try {
      if (!ctx.request.body.email) {
        ctx.throw(400, "please provide the job title");
      }
      if (!ctx.request.body.password) {
        ctx.throw(400, "please provide password");
      }
      ctx.body = await ctx.db.User.create({
        email: ctx.request.body.email,
        password: ctx.request.body.password
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
