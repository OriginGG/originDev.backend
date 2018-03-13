let createRecord = (knex,  o, bt) => {
    return knex('origin.twitch_channels').insert({
        organisation: o,
        channel_name: bt
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create Twitch Channels');

    return knex('origin.twitch_channels')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(knex,
                    'ascendant',
                    'Neslo'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'Sharp'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'k1lla93'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'Mirx'
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.twitch_channels_id_seq restart with 5'
            );
        });
    
};
