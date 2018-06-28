// Load in Database and select roster individuals
'use strict'

const Env = use('Env');
const Database = use('Database');
const getTwitchuser = require('TwitchController.js')

class TwitchController{
    async getRosterIndividualInfo({ response, request }){

    
    var user_twitch_link = await Database.select('twitch_link').from('rosters');
    for(i=0;i<len(user_twitch_link),i++){

        if (user_twitch_link[i] != null)
        {
            getTwitchuser.getTwitchUserInfo()
        }
    
    }
}


// use the gettiwchuser method to grab the user data in a for loop


// 