'use strict'

const Env = use('Env')
const axios = require('axios');
var Twitter = require('twitter');



class TwitterController {
  async getTwitterUserInfo({session,response,request
  }) {
    const data = request.only(['user']);
    try {
      const twitterData = await this.UserLookUp(data.user);
      response.json(twitterData);
    } catch (err) {
      response.json({
        success: false
      });
    }

  }


  UserLookUp(user) {
    var client = new Twitter({
      consumer_key: `${Env.get('TWITTER_CONSUMER_KEY')}`,
      consumer_secret: `${Env.get('TWITTER_CONSUMER_SECRET')}`,
      access_token_key: '4310668813-IwYHz0BaZ2l9EvDrnsnJouH71ZaClhajKYkf9TY',
      access_token_secret: 'XJsFyx24vStqsBfKOgrRMmVMeBVLu04urxhi5Ppz7qDts'
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
