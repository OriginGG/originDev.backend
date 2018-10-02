exports.up = async function (knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .table('recentmatches', function (table) {
                table.string('type').defaultTo('');
            })
    ]);
};

exports.down = async function (knex) { };
