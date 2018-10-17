exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .table('combined_roster_individuals', function (table) {
                table.dropForeign('roster_id', 'combined_roster_individuals_roster_id_foreign');
                table.dropForeign('individual_id', 'combined_roster_individuals_individual_id_foreign');
            })])};

exports.down = async function(knex) {
    
};
