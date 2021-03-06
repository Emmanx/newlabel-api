'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.product.findOne({ id }, [
        {
          path: 'genres'
        },
        {
          path: 'related',
          populate: {
            path: 'genres'
          }
        }
      ]);
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};

