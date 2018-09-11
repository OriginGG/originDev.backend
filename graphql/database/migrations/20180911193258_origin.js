exports.up = async function (knex) {
    return Promise.all([
        knex.schema.withSchema('origin').createTable('stripe_customers', table => {
            table.increments();
            table.timestamps(true, true);
            table.integer('user_id').references('id').inTable('origin.users');
            table.string('customer_id_token');
            table.string('default_source');
            table.string('description');
            table.string('invoice_prefix');
            table.string('email');
        })
    ])
};

exports.down = async function (knex) {

};
