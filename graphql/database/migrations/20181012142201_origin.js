exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema(['origin'])
            .alterTable('organisation_account', function (table) {
                table.string('support_contact_email').defaultTo('');
                table.string('business_contact_email').defaultTo('');
                
            })
    ]);
};

exports.down = async function(knex) {

};
