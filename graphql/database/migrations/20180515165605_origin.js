exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {
            table.string('username')
            table.string('instagram_link')
            table.string('facebook_link')
        })
    ])
};

exports.down = async function (knex) {

};
