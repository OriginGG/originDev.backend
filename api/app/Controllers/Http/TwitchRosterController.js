'use strict'

const Env = use('Env')
const axios = require('axios');
const Database = use('Database');
const TwitchController = require('./TwitchController');

class TwitchGroupController {

    async getTwitchGroupUserInfo({ session, response, input }) {
      
        const url = `${Env.get('TWITCH_API')}/users?login=${input}`;
        const token = await TwitchController.getTwitchToken(session);
        try {
            const td = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (td.data.data.length > 0) {
                console.log())
            } else {
                response.json({ success: false });
            }   
        } catch (err) {
            response.json({ success: false });
        }
    }
    async DatabaseUpdates()
    {
    
        var roster_id = await Database.select('id')
        .from('rosters')
        .where('sub_domain','enigma');
        
        

      
        var individual_ids = await Database.select('individual_id')
        .from('roster_individuals')
        .where('roster_id',`${roster_id[0].id}`);

        for(var i = 0; i < individual_ids.length;i++)
        {
        
        
        var individualusers = await Database
        .select('username','twitch_url').from('individual_users')
        .where('id',`${individual_ids[i].individual_id}`);
        
        console.log(individualusers[i].twitch_url);

        if(individualusers[i].twitch_url){
            const tu = individualusers[i].twitch_url.substring(individualusers[i].twitch_url.lastIndexOf('/') + 1);
            console.log(tu);
            var views = TwitchController.getTwitchUserInfo(input=tu);
        }
       

       
        }
        twitchJson.push(individualusers);


        
        console.log(twitchJson);
       
    }

}
module.exports = TwitchGroupController
