exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.integer('num_touch_up_email_sent').defaultTo(0);
            table.dateTime('email_sent_date')
            table.boolean('email_fire_success');
            table.boolean('email_response_success');
        })
    ])
};

exports.down = async function (knex) {

};
