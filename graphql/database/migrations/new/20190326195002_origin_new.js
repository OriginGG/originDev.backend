exports.up = async function (knex) {
    return Promise.all([
        knex.schema.createTable('ind_registration_emails', function (table) {
            table.string('email').primary();
            table.timestamps(true, true);
            table.text('payload')
        })
    ])
};

exports.down = async function (knex) {

};
