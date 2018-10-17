exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .alterTable('combined_roster_individuals', function (table) {
                table.integer('roster_id').references('id').inTable('origin.combined_rosters').onDelete('cascade').alter();
                table.integer('individual_id').references('id').inTable('origin.individual_users').onDelete('cascade').alter();
            })])};

exports.down = async function(knex) {
    
};
