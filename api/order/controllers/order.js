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
    const {txId, amount, product, user, donation, paymentType} = ctx.request.body;

    
    try {
      if(paymentType === 'wallet') {
        const customer = await strapi
          .query("user", "users-permissions")
          .model.findOne({ _id: user }).select("walletBalance")

        if(customer.walletBalance < amount) ctx.send({message: 'Insufficient wallet balance'}, 400)

        await strapi
          .query("user", "users-permissions")
          .model.findOneAndUpdate({ _id: user }, { walletBalance: customer.walletBalance - amount })
          
        const entity = await strapi.services.order.create({
          user,
          product,
          txId,
          paymentType,
          amount,
          status: 'successful',
          donation: false,
        })

        return sanitizeEntity(entity, { model: strapi.models.order });
      } else if(paymentType === 'gateway') {
        const txDetails = await strapi.services.transaction.verify(txId);
        
        if(amount > txDetails.amount) throw new Error('Product amount is greater than txDetails amount')

        const entity = await strapi.services.order.create({
          user,
          product,
          txId,
          paymentType,
          amount: txDetails.amount,
          status: txDetails.status,
          donation: false,
        })

        return sanitizeEntity(entity, { model: strapi.models.order });
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  },
};

