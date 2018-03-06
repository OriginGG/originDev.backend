let createRecord = (knex,  f, l) => {
    const td = JSON.stringify(l);
    return knex('origin.themes').insert({
        theme_name: f,
        theme_data: td
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create Themes');

    return knex('origin.themes')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(knex, 'origin', {
                    colorPrimary: 'green',
                    login_contentWidth: '840px',
                    login_contentHeight: '300px',
                    card_contentWidth: '640px',
                    card_contentHeight: '800px',
                    user_styles: {
                        user_test_width: '200px'
                    }
                })
            );
            return Promise.all(records);
        })
    
};
