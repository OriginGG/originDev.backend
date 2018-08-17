exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {
            table.integer('twitch_user_id');
        })
    ])
};