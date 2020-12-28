'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */

    async create(ctx) {
      const {txRef, product, user, paymentType} = ctx.request.body;

      // try {
      //   const txDetails = await strapi.services.transaction.verify(txRef);
      //   console.log(txDetails)
      // } catch (error) {
      //   ctx.send(error.response.data.message, 400)
      // }

      const entity = await strapi.services.order.create({
        user,
        product,
        txRef,
        paymentType,
        amount: 1,
        status: 'successful',
      })
      
      return sanitizeEntity(entity, { model: strapi.models.order });
    },
  };

