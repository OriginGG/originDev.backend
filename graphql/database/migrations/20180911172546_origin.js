exports.up = async function (knex) {
    return Promise.all([
        knex.schema.withSchema('origin').createTable('stripe_products', table => {
            table.increments();
            table.timestamps(true, true);
            table.string('product_id_token');
            table.string('name');
            table.boolean('active');
        }),
        knex.schema.withSchema('origin').createTable('stripe_plans', table => {
            table.increments();
            table.integer('product_id').references('id').inTable('origin.stripe_products');
            table.timestamps(true, true);
            table.string('plan_id_token');
            table.string('plan_name');
            table.integer('amount');
            table.string('currency');
            table.string('billing_scheme');
            table.string('interval');
            table.integer('interval_count');
            table.boolean('active');
        }),
    ])
};

exports.down = async function (knex) {

};
