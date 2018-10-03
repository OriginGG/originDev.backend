'use strict'

const Env = use('Env')
const axios = require('axios');



class TwitterAuthController {
  async getTwitterAccessToken({request,session}) {
    const data = request.get();
    const td = await axios.post('https://api.twitter.com/oauth/access_token',{
        headers: {
            oauth_token:'test',
            oauth_token_secret:'test',
            oauth_verifier:''
        }
    })
  }
}




module.exports = TwitterAuthController
