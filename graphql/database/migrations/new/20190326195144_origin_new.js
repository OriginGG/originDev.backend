exports.up = function (knex, Promise) {
    return Promise.all([
        knex.raw('grant select, insert, update, delete on table origin.ind_registration_emails to origin_anonymous, origin_user, origin_admin;')
    ])
};

exports.down = async function (knex) {

};
