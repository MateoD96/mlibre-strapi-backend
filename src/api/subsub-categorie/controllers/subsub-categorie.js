"use strict";

/**
 * subsub-categorie controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subsub-categorie.subsub-categorie",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;

      await this.validateQuery(ctx);

      const entity = await strapi.db
        .query("api::subsub-categorie.subsub-categorie")
        .findOne({
          where: { slug },
          populate: ["sub_categoria", "filtros"],
        });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
