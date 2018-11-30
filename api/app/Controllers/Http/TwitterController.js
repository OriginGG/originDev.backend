'use strict'

const Env = use('Env')
const axios = require('axios');
var Twitter = require('twitter');



class TwitterController {
  async getTwitterUserInfo({
    session,
    response,
    request
  }) {
    const data = request.only(['user']);
    try {
      const twitterData = await this.UserLookUp(data.user);
      response.json(twitterData);

    } catch (err) {
      console.log(err);
      response.json({
        error:err,
        success: false
      });
    }

  }


  UserLookUp(user) {
    var client = new Twitter({
      consumer_key: `${Env.get('TWITTER_CONSUMER_KEY')}`,
      consumer_secret: `${Env.get('TWITTER_CONSUMER_SECRET')}`,
      access_token_key: '4310668813-1ZpDGWPdpB1AgvTlltAnFNfwbmIqfhRvlkJIEVd',
      access_token_secret: 'jT1a0bsgaosBcrli07hM3qU2ZnxnycqfdXmgN5sh1moSw'
    });
    var params = {
      screen_name: `${user}`
    };
    return new Promise(async (resolve, reject) => {
      client.get('users/lookup', params, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}




module.exports = TwitterController
