'use strict';
const Env = use('Env');
const Database = use('Database');

class DBNotificationController {
    async dbNotification() {
        const users = await Database.raw(`SELECT * FROM USERS WHERE users.created_at > current TIMESTAMP - INTERVAL '1 week'`);
        console.log(users);
        await axios.post(`${Env.get(SLACK_DATABASE_NOTIFICATION_WEBHOOK)}`,{
            'text': ` *New User Signup* : ${JSON.stringify(users.rows)}`});

    }

}

module.exports = DBNotificationController;
