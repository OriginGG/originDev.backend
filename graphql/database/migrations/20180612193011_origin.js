exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('staff_individuals', function (table) {
            table.integer('staff_id').references('id').inTable('origin.staff').onDelete('cascade')
            table.integer('individual_id').references('id').inTable('origin.individual_users').onDelete('cascade')
        }),
    ])
};