exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {

            table.text('accomplishments');
            table.string('twitch_url');
            table.string('twitter_handle');
            table.string('youtube_channel');
            table.string('youtube_video1_url');
            table.string('youtube_video2_url');
            table.string('youtube_video3_url');
        })
    ])
};

exports.down = async function (knex) {

};
