let createRecord = (knex,  o, v1,v2,v3,v4) => {
    return knex('origin.youtube_channels').insert({
        organisation: o,
        youtube_video_1: v1,
        youtube_video_2: v2,
        youtube_video_3: v3,
        youtube_video_4: v4
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
                    'https://www.youtube.com/watch?v=oS9ACN5XQ0M',
                    'https://www.youtube.com/watch?v=rh8HEF63rx4',
                    'https://www.youtube.com/watch?v=Cdb-X9aQmPY&t=637s',
                    'https://www.youtube.com/watch?v=7D-Jd0BYsBc'
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.youtube_channels_id_seq restart with 2'
            );
        });
    
};
