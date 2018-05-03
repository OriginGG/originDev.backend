exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {
            table.text('banner_image_url');
            table.string('profile_image_url');
        })
    ])
};

exports.down = async function (knex) {

};
