exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .table('recentmatches', function (table) {
                table.string('event_url').defaultTo('');
                table.string('event_league').defaultTo('');
                table.string('event_date').defaultTo('');
                table.string('event_info').defaultTo('');
            })
    ]);
};

exports.down = async function(knex) {

};
