module.exports = {
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
        email: ctx.request.body.email
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
