exports.up = async function (knex) {
    return Promise.all([
        knex.schema.createTable('email_touch', function (table) {
            table.integer('num_touch_up_email_sent').defaultTo(0);
            table.dateTime('email_sent_date')
            table.boolean('email_fire_success');
            table.boolean('email_response_success');
            table.integer('user_id').references('id').inTable('origin.users');
        }),
        knex.schema.table('users', function (table) {
            table.dropColumn('num_touch_up_email_sent')
            table.dropColumn('email_sent_date')
            table.dropColumn('email_fire_success');
            table.dropColumn('email_response_success');
        }),
    ])
};

exports.down = async function (knex) {

};
