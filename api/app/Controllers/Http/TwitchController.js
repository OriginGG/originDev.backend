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
            console.log(err);
            response.json({ success: false });
        }
    }
    async getTwitchTeamStream({ response, request ,session}) {
        const data = request.only(['teamurl','users']);
        if(data.teamurl){
        const teamOfficialName = data.teamurl.substring(data.teamurl.lastIndexOf('/') + 1);
        const url = `https://api.twitch.tv/kraken/teams/${teamOfficialName}`;
        try {
            let userList = [];
            const td = await axios.get(url, {
                headers: {
                    Accept: 'application/vnd.twitchtv.v5+json',
                    "Client-ID": Env.get('TWITCH_CLIENT_ID')
                }
            });
            const allUsersData = td.data;

            td.data.users.forEach(function(user)
            {
                userList.push(user._id);
            });
            const streamData = await this.getIndividualStreams(userList,session);
            let DataMap = {};
            if(streamData.users)
            {
            streamData.users.forEach(function(user)
            {
                DataMap[user.user_id.toString()] = user.thumbnail_url;

            });
            allUsersData.users.forEach(function(user)
            {   

                if(Object.keys(DataMap).includes(user._id.toString())){
                  
                    user['thumbnail_url'] = DataMap[user._id];
                    user['live'] = true
                }else
                {
                    user['thumbnail_url'] = null;
                    user['live'] = false;
                }
            })

            response.json({success:true,data:allUsersData});
        }else
        {
            allUsersData.users.forEach(function(user)
            {   

                    user['thumbnail_url'] = null;
                    user['live'] = false;
                })
            
            response.json({success:true,data:allUsersData});
        }
        } catch (err) {
            console.log(err);
            response.json({ success: false });
        }
    }
    else if(data.users)
    {
        try{  
        const { users } = data;
        const p_array = users.split(',');
        const userData = await this.getIndividualStreams(p_array,session);
        response.json({ success: true, users: userData});
        }catch(error)
        {
            console.log(error);
            response.json({
                'success':false,
                'error':error
            })
        }
    }
}
    getIndividualStreams(teamList,session)
    {
        return new Promise(async (resolve, reject) => {
            let q_string = '';
            teamList.forEach((p) => {
                if (q_string === '') {
                    q_string = `user_id=${p}`;
                } else {
                    q_string = `${q_string}&user_id=${p}`;
                }
            });
            const url = `${Env.get('TWITCH_API')}/streams?${q_string}`;
            const token = await this.getTwitchToken(session);
            try {
                const td = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (td.data.data.length > 0) {
                    resolve({ success: true, users: td.data.data });
                } else {
                    resolve({ status: 'not live' });
                }
            } catch (err) {
                console.log(err);
                resolve({ success: false ,err:err});
            }
        }
        )
    }
    // async getTwitchStreams({ session, response, request }) {
    //     const data = request.only('users')
    //     const { users } = data;
    //     const p_array = users.split(',');
    //     let q_string = '';
    //     p_array.forEach((p) => {
    //         if (q_string === '') {
    //             q_string = `user_id=${p}`;
    //         } else {
    //             q_string = `${q_string}&user_id=${p}`;
    //         }
    //     });
    //     console.log(q_string);
    //     const url = `${Env.get('TWITCH_API')}/streams?${q_string}`;
    //     const token = await this.getTwitchToken(session);
    //     try {
    //         const td = await axios.get(url, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (td.data.data.length > 0) {
    //             response.json({ success: true, users: td.data.users });
    //         } else {
    //             response.json({ success: false });
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         response.json({ success: false });
    //     }
    // }
}
module.exports = TwitchController
