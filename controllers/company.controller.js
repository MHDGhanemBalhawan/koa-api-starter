module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.Company.create({
        name: ctx.request.body.name,
        city: ctx.request.body.city,
        address: ctx.request.body.address
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Company.findAll({});
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
