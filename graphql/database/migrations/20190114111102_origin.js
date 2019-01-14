exports.up = async function(knex) {
    return Promise.all([
        knex.schema.table('email_touch', function (table) {
            table.string('email_type',254).defaultsTo('');
            table.string('email').defaultsTo('');
            table.timestamps(true, true);
            table.dropColumn('email_fire_success');
            table.dropColumn('email_sent_date');
            table.dropColumn('num_touch_up_email_sent');
        }),
    ])
};

exports.down = async function(knex) {

};