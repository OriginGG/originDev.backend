exports.up = async function (knex) {
    return Promise.all([
        knex.schema
            .withSchema('origin')
            .createTable('combined_rosters', table => {
                table.increments();
                table.timestamps(true, true);
                table.integer('game_id');
                table.string('position_id');
                table.string('sub_domain');
                table.string('team_name');
            }),
        knex.schema
            .withSchema('origin')
            .createTable('roster_individuals', table => {
                table.increments();
                table.integer('roster_id').references('id').inTable('origin.rosters')
                table.integer('individual_id').references('id').inTable('origin.individual_users')
                table.timestamps(true, true);
            }),
    ])
};

exports.down = async function (knex) {

};
