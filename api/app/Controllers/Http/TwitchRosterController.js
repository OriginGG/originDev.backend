// Load in Database and select roster individuals
'use strict'

const Env = use('Env');
const Database = use('Database');
const getTwitchuser = require('TwitchController.js')

class TwitchController{
    async getRosterIndividualInfo({ response, request }){

    
    var roster_users = await Database.select('twitch_link').from('rosters');

   

}


// use the gettiwchuser method to grab the user data in a for loop


// 