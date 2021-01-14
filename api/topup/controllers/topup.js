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
    const {txId, user } = ctx.request.body;

    try {
      const txDetails = await strapi.services.transaction.verify(txId);

      let customer = await strapi
        .query("user", "users-permissions")
        .model.findOne({ _id: user }).select("walletBalance")

      await strapi
        .query("user", "users-permissions")
        .model.findOneAndUpdate({ _id: user }, { walletBalance: customer.walletBalance + txDetails.amount })

      const topup = await strapi.services.topup.create({
        user,
        txId,
        amount: txDetails.amount,
        status: txDetails.status,
      })
      
      return sanitizeEntity(topup, { model: strapi.models.topup })
    } catch (error) {
      console.log(error)
      throw error
    }
  },
};

