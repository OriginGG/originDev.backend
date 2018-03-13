let createRecord = (knex, id, f, l, e, ph, oid, au) => {
    return knex('origin.users').insert({
        id,
        first_name: f,
        last_name: l,
        email: e,
        password_hash: ph,
        organisation: oid,
        admin_user: au
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create User');

    return knex('origin.users')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(
                    knex,
                    1,
                    'Stefan',
                    'Walker',
                    'stefan.walker@gmail.com',
                    '$2a$06$UEwBzEmi9y8VdLL3rj2t/erTbj9HZmEwG/7R1qlOz2D/I0zDfGjsG',
                    null,
                    true
                )
            );
            records.push(
                createRecord(
                    knex,
                    2,
                    'Test',
                    'User',
                    'test@ascendant.com',
                    '$2a$06$UEwBzEmi9y8VdLL3rj2t/erTbj9HZmEwG/7R1qlOz2D/I0zDfGjsG',
                    'ascendant',
                    true
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.users_id_seq restart with 3'
            );
        });
};
