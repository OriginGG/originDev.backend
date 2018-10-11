'use strict'

const Env = use('Env')
const axios = require('axios');



class TwitterAuthController {
  async twitterAuthorization({request,session,response,auth}) {
    try{
    //Grabs User details if Logged In
    let user = await auth.getUser()
    const token = await api.getToken('twitter', user.id);
    if (token === null) {
      response.redirect('/auth/twitter?redirect=' + request.originalUrl())
    }
    }catch(e){
      console.log(e);
      response.redirect('/signup_ind');
    }
  }
}




module.exports = TwitterAuthController
