exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .alterTable('recentmatches', function (table) {
                table.string('event_description',262144).alter();
                
            })
    ]);
};

exports.down = async function(knex) {

};
