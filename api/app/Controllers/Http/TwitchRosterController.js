'use strict'

const Env = use('Env')
const axios = require('axios');
const Database = use('Database');

class TwitchGroupController {
    
    
    
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
    async getTwitchGroupInfo({ session, response, request }) {
        const rosternames = 
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
            response.json({ success: false });
        }
    }
    async getRosterIndividuals({}){

    }


}
module.exports = TwitchController
