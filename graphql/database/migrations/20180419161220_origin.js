exports.up = async function(knex) {
    return Promise.all([
        knex.schema.table('organisation_account', function (table) {
            table.string('youtube_link').defaultTo('');
        })
    ])
};

exports.down = async function(knex) {

};
