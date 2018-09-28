exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .table('recentmatches', function(table) {
                table.text('event_description').defaultTo('');
            })
    ]);
};

exports.down = async function(knex) {};
