'use strict';

const axios = require('axios')

/**
 * `transaction` service.
 */

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }

  verify: async (txId) => {
    const {data} = await axios.get(`https://api.flutterwave.com/v3/transactions/${txId}/verify`,  {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SEC_KEY}`
      }
    })

    return data.data
  }
};
