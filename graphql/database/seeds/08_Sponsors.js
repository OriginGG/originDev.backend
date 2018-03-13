let createRecord = (knex,  o, bt, li) => {
    return knex('origin.sponsors').insert({
        organisation: o,
        image_url: bt,
        link_url: li
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create Sponsors');

    return knex('origin.sponsors')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/1518194462521EGL_logo_410x.png',
                    '',
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/sponsor-logo2.png',
                    ''
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/1518194462521EGL_logo_410x.png',
                    '',
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/sponsor-logo2.png',
                    ''
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.sponsors_id_seq restart with 5'
            );
        });
    
};
