
let createRecord = (knex, f, l, ts) => {
    return knex('origin.themes').insert({
        theme_name: f,
        theme_data: l,
        theme_structure: ts
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
                    signupHeaderColor: '#fff',
                    login_contentWidth: '840px',
                    login_contentHeight: '300px',
                    signup_contentWidth: '100%',
                    signup_contentHeight: '100%',
                    card_contentWidth: '640px',
                    card_contentHeight: '800px',
                    user_styles: {
                        lightHeaderColor: '#fff',
                    }
                },
                    {
                        header: {
                            logo: {
                                type: 'image', imageData: 'https://s3.amazonaws.com/origin-images/origin/logo-top.png', bgImage: false },
                            menu: {
                                items: {
                                    menu1: {
                                        text: 'About Us',
                                        url: 'google.com',
                                    },
                                    menu2: {
                                        text: 'Contact Us',
                                        url: 'google.com',
                                    },
                                    menu3: {
                                        text: 'Privacy',
                                        url: 'google.com',
                                    },
                                    menu4: {
                                        text: 'Terms',
                                        url: 'google.com',
                                    }
                                }
                            }
                        },
                        main_section: {
                            background: {
                                type: 'image', imageData: 'https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg1.jpg', bgImage: false },
                        },
                    }
                )
            );
            return Promise.all(records);
        })

};
