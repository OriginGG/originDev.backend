exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .alterTable('combined_rosters', function (table) {
                table.integer('position_id').alter();
                
                
            })
    ]);
};

exports.down = async function (knex) {

};