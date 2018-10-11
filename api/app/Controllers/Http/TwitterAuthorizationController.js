'use strict'

const Env = use('Env')
const axios = require('axios');
const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const url = require('url')

class TwitterAuthorizationController{
    async getTwitterAuthToken({request,response,session, params}){
   
        const p = session.get('twitter_auth_object');
        // if(!p)
            const token = await this.readTwitterTokenFromServer(url.parse(request.originalUrl(), true).query.p);
            response.redirect(`https://api.twitter.com/oauth/authorize?${token}`);
        // }
    }
    
    readTwitterTokenFromServer(userToken) {
        return new Promise(async (resolve, reject) => {
            const oauth = OAuth({
                consumer: { key: `${Env.get('TWITTER_CONSUMER_KEY')}`, secret: `${Env.get('TWITTER_CONSUMER_SECRET')}`},
                signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }});
            const request_data = {
                url: 'https://api.twitter.com/oauth/request_token',
                method: 'POST',
                data: { oauth_callback: `http://0.0.0.0:8080/auth/twitter/redirect?p=${userToken}` }
              };

            
            try {
               const td = await axios({
                    url: request_data.url,
                    method: request_data.method,
                    form: request_data.data,
                    headers: oauth.toHeader(oauth.authorize(request_data))
                });
                resolve(td.data);
            } catch (err) {
                console.log(err);
                resolve(null);
            }    
        })
    }
    async twitterRedirect({request,response, session})
    {
        const result = request.all()
        console.log(result)
        response.redirect(`http://localhost:3000/individual?p=${url.parse(request.originalUrl(), true).query.p}`);
    }
    async getTwitterToken(session, request) {
        
        const p = session.get('twitch_auth_object')
        
        if (!p) {
            const token = await this.readTwitchTokenFromServer();
           
            session.put('twitch_auth_object', token);
         
            const d = new Date();
            const n = d.getTime();
            const exp_time = n + token.expires_in;
            session.put('twitch_auth_expiry', exp_time);
            return token.access_token;
        } else {
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
        // first see if its in the session.

    }
}


module.exports = TwitterAuthorizationController