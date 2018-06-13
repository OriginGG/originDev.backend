exports.up = async function (knex) {
    return Promise.all([
        knex.schema
            .withSchema('origin')
            .createTable('staff', table => {
                table.increments();
                table.timestamps(true, true);
                table.string('sub_domain')
                table.integer('position_id')
            }),
        knex.schema
            .withSchema('origin')
            .createTable('staff_individuals', table => {
                table.increments();
                table.integer('staff_id').references('id').inTable('origin.staff')
                table.integer('individual_id').references('id').inTable('origin.individual_users')
                table.timestamps(true, true);
            }),
    ])
};

exports.down = async function (knex) {

};
