'use strict'

const Env = use('Env')
const axios = require('axios');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');

class TwitchAuthController{
    async getTwitchAuthToken({request,response}){
        const data = request.get('userid');
        
    }
    readTwitchTokenFromServer() {
        return new Promise(async (resolve, reject) => {
            const url = `${Env.get('TWITCH_AUTH_API')}/oauth2/token?client_id=${Env.get('TWITCH_CLIENT_ID')}&client_secret=${Env.get('TWITCH_CLIENT_SECRET')}&grant_type=client_credentials`;
            try {
                const td = await axios.post(url);
                
                resolve(td.data);
            } catch (err) {
                resolve(null);
            }    
        })
    }
    async getTwitchToken(session) {
        
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


module.exports = TwitterAuthController