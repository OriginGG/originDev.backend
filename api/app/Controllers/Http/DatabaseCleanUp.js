'use strict';
const Env = use('Env');
const Database = use('Database');


class DatabaseCleanUp {
    async startCleanUp()
    {
      
    var j = schedule.scheduleJob('cleanUp','0 0 */ * * *', async() => {
        await Database.raw(`DELETE FROM USERS WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '3 DAYS' AND organisatio = null`);

    })
}
async stopCleanUp()
{const dbCleanUp = schedule.scheduledJobs['cleanUp'];
dbCleanUp.cancel();

}
}

module.exports = DatabaseCleanUp;
