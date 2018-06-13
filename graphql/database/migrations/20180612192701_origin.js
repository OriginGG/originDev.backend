exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('staff_individuals', function (table) {
            table.dropColumn('staff_id')
            table.dropColumn('individual_id')
        })
    ])
};