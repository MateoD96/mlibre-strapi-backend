"use strict";

/**
 * sub-categoria controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::sub-categoria.sub-categoria",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;

      await this.validateQuery(ctx);

      const entity = await strapi.db
        .query("api::sub-categoria.sub-categoria")
        .findOne({
          where: { slug },
          populate: {
            subsub_categories: {
              populate: {
                url_image: true,
              },
            },
            url_image: true,
          },
        });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
