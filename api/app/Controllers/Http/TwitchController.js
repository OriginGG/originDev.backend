'use strict'

const Env = use('Env')
const axios = require('axios');

class TwitchController {
    async getTwitchUserID({ response, request }) {
        const data = request.only(['user']);
        const url = `${Env.get('TWITCH_API')}/users?login=${data.user}`;
        try {
            const td = await axios.get(url, {
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    "Client-ID": Env.get('TWITCH_CLIENT_ID')
                }
            });
            response.json({ success: true, users: td.data.users });
        } catch (err) {
            response.json({ success: false });
        }    
    }
    async getTwitchChannelFollowers({ response, request }) {
        const data = request.only('id')
        const url = `${Env.get('TWITCH_API')}/channels/${data.id}/follows`;
        try {
            const td = await axios.get(url, {
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    "Client-ID": Env.get('TWITCH_CLIENT_ID')
                }
            });
            response.json({ success: true, followers: td.data.follows });
        } catch (err) {
            response.json({ success: false });
        }    
    }
    async getTwitchChannelTeams({ response, request }) {
        const data = request.only('id')
        const url = `${Env.get('TWITCH_API')}/channels/${data.id}/teams`;
        try {
            const td = await axios.get(url, {
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    "Client-ID": Env.get('TWITCH_CLIENT_ID')
                }
            });
            response.json({ success: true, teams: td.data.teams });
        } catch (err) {
            response.json({ success: false });
        }
    }
}
module.exports = TwitchController
