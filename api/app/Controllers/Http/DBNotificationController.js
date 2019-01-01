'use strict';
const Env = use('Env');
const Database = use('Database');
const axios = require('axios');

class DBNotificationController {
  async dbNotification() {
    try {
      const users = await Database.raw(`SELECT * FROM USERS WHERE users.created_at > current_TIMESTAMP - INTERVAL '1 day'`);
      const newSignUp = users.rows;
      let signUpStr = 'Daily User Signup Report \n\n';
      await newSignUp.forEach((row) => {
        signUpStr += `*Organization* : ${row.organisation}\n*Create Time* : ${row.created_at}\n*First Name* : ${row.first_name}\n*Last Name* : ${row.last_name}\n*Email* : ${row.email} \n*Authenticated* : ${row.authenticated} \n\n\n\n`;
      });
      console.log(newSignUp);
      await axios.post(`${Env.get('SLACK_DATABASE_NOTIFICATION_WEBHOOK')}`, {
        'text': signUpStr
      });
    } catch (error) {
      console.log(error);
      axios.post(`${Env.get('SLACK_DATABASE_NOTIFICATION_WEBHOOK')}`, {
        'text': `*New User Signup* : ${error.message}`
      });
    }
  }

}

module.exports = DBNotificationController;
