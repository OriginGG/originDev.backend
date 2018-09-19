exports.up = async function (knex) {
    return Promise.all([
        knex.schema.withSchema('origin').dropTable('stripe_plans'),
        knex.schema.withSchema('origin').dropTable('stripe_products')
    ])
};

exports.down = async function (knex) {

};
