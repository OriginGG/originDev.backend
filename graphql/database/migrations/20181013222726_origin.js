exports.up = async function(knex) {
    return Promise.all(([
        knex.schema
            .withSchema('origin')
            .createTable('combined_rosters', table => {
                table.increments();
                table.timestamps(true, true);
                table.integer('game_id');
                table.integer('position_id');
                table.string('sub_domain');
                table.string('team_name');
                table.string('roster_type');
            }),
        knex.schema
            .withSchema(['origin'])
            .createTable('combined_roster_individuals', table => {
                table.increments();
                table.timestamps(true, true);
                table.integer('roster_id').references('id').inTable('origin.combined_rosters');
                table.integer('individual_id').references('id').inTable('origin.individual_users');
                table.string('individual_type');
            }),
    ]))
};

exports.down = async function(knex) {

};
