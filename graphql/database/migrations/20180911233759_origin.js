exports.up = async function (knex) {
    return Promise.all([
        knex.schema.withSchema(['origin']).table('organisation_account', function (table) {
            table.string('discord_url').defaultTo('');
        }
        )
    ])
};

exports.down = async function (knex) {

};