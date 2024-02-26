"use strict";

/**
 * producto controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::producto.producto",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;

      await this.validateQuery(ctx);

      const entity = await strapi.db.query("api::producto.producto").findOne({
        where: { slug },
        populate: {
          image: true,
          subsub_categorie: {
            populate: {
              sub_categoria: {
                fields: ["slug", "title"],
              },
            },
            fields: ["slug", "title"],
          },
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
