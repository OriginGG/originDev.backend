'use strict'
 const Env = use('Env')
const axios = require('axios');
const request = require('request');
 class TwitchTeamAuthController{
    async redirectToAuthorizationPage({request,response,session, params}){
    const data = request.get(['p']);
    session.put('user_id',data.p);
      const p = session.get('twitch_auth_object')   
      if (!p) {
        const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=rqzzwac7g5od7phmuncqzj32b9a7mz&client_secret=i3tn1nk3s496yy46syhx1uzx238z78&redirect_uri=http://0.0.0.0:8080/auth/twitch/redirect?p=${data.p}&scope=bits:read analytics:read:extensions`;
        response.redirect(url);
    } else {
        response.json({success:true})
        const tm = session.get('twitch_auth_expiry');
        
        const d = new Date();
        const n = d.getTime();
        if (n > tm) {
            const token = await this.readTwitchTokenFromServer();
            session.put('twitch_auth_object', token);
            const d = new Date();
            const n = d.getTime();
            const exp_time = n + token.expires_in;
            session.put('twitch_auth_expiry', exp_time);
            return token.access_token;
        } else {
            return p.access_token;
        }
    }
    
    }

async getTwitchUserInfo({request,response,session})
{
    const data = request.all()
    // console.log(data);
    // console.log(session);
}

    async twitchRedirect({request,response, session})
    {
        // console.log(session);
        console.log(session.all());
        const data = request.all();
        console.log(data);
        const authCode = data.code;
       
        const url = `https://id.twitch.tv/oauth2/token?client_id=rqzzwac7g5od7phmuncqzj32b9a7mz&client_secret=i3tn1nk3s496yy46syhx1uzx238z78&redirect_uri=http://0.0.0.0:8080/auth/twitch/redirect&code=${authCode}&grant_type=authorization_code`
       try{
        const token = await axios.post(url);
        // console.log(token);
        session.put('twith_auth_object',token);
        response.redirect();
       }catch(error)
       {
        //  console.log(error);
         response.json({error:error});
       }
    response.json({sucess:true});
    }
    async getTwitterUserInfo({session,response,request}) {
        const data = request.all();
        try {
          const twitterData = await this.UserLookUp(data.screenname,data.oauth_token,data.tokensecret);
          response.json(twitterData);
    
        } catch (err) {
            // console.log(err);
          response.json({
            success: false
          });
        }
      }
    
     async getTwitchUserInfo({ session, response, request }) {
      const data = request.only('name')
      const url = `${Env.get('TWITCH_API')}/users?login=${data.name}`;
      const token = await this.getTwitchToken(session);
      try {
          const td = await axios.get(url, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          if (td.data.data.length > 0) {
              response.json({ success: true, user: td.data.data[0] });
          } else {
              response.json({ success: false });
          }   
      } catch (err) {
        //   console.log(err);
          response.json({ success: false });
      }
  }
}
 module.exports = TwitchTeamAuthController