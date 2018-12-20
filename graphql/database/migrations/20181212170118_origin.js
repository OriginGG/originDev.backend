exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {
            table.string('twitch_user_id').alter();
        }),
    ])
};