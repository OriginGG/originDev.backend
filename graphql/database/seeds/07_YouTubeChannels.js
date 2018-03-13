let createRecord = (knex,  o, bt) => {
    return knex('origin.youtube_channels').insert({
        organisation: o,
        channel_name: bt
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create YouTube Channels');

    return knex('origin.youtube_channels')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://www.youtube.com/watch?v=oS9ACN5XQ0M'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://www.youtube.com/watch?v=rh8HEF63rx4'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://www.youtube.com/watch?v=Cdb-X9aQmPY&t=637s'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://www.youtube.com/watch?v=7D-Jd0BYsBc'
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.youtube_channels_id_seq restart with 5'
            );
        });
    
};
