let createRecord = (knex,  o, s1, s2, s3, s4) => {
    return knex('origin.sponsors').insert({
        organisation: o,
        sponsor1: s1,
        sponsor2: s2,
        sponsor3: s3,
        sponsor4: s4,
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
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/sponsor-logo2.png',
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/1518194462521EGL_logo_410x.png',
                    'https://s3.amazonaws.com/origin-images/ascendant/sponsors/sponsor-logo2.png',
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.sponsors_id_seq restart with 2'
            );
        });
    
};
