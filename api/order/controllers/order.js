'use strict';

const { sanitizeEntity } = require('strapi-utils');

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
    const {txId, product, user, donation, paymentType} = ctx.request.body;

    try {
      const txDetails = await strapi.services.transaction.verify(txId);

      const entity = await strapi.services.order.create({
        user,
        product,
        txId,
        paymentType,
        amount: txDetails.amount,
        status: txDetails.status,
        donation
      })

      if(paymentType === wallet) {
        const customer = await strapi
          .query("user", "users-permissions")
          .model.findOne({ _id: user }).select("walletBalance")

        await strapi
          .query("user", "users-permissions")
          .model.findOneAndUpdate({ _id: user }, { walletBalance: customer.walletBalance - txDetails.amount })
      }
      
      return sanitizeEntity(entity, { model: strapi.models.order });
    } catch (error) {
      console.log(error)
      throw error
    }
  },
};

