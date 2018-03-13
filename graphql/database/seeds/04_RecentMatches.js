let createRecord = (knex,  o, ot, ol, g, gl, s) => {
    return knex('origin.recentmatches').insert({
        organisation: o,
        opposite_team_name: ot,
        opposite_team_logo: ol,
        game_name: g,
        game_logo: gl,
        score: s
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create Recent Matches');

    return knex('origin.recentmatches')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(knex,
                    'ascendant',
                    '',
                    '1518910314231Capture.PNG',
                    'WOW',
                    'wow.png',
                    '3 - 2'
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.recentmatches_id_seq restart with 2'
            );
        });
    
};
