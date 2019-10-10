module.exports = {
  async find(ctx) {
    try {
      ctx.body = "await ctx.db.Candidate.findAll({})";
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
