exports.up = async function (knex) {
    return Promise.all([
        knex.schema.createTable('content_team', function (table) {
            table.increments();
            table.timestamps(true, true);
            table.integer('member_id').references('id').inTable('origin.organisation_members');
        }),
    ])
};