// Update with your config settings.

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'origingg.cjdraitfnk0j.us-east-1.rds.amazonaws.com',
            database: 'originGG',
            user: 'origin',
            password: 'allegro1234'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations'
        },
        seeds: {
            tableName: 'knex_seeds',
            directory: './database/seeds'
        }
    }

    // staging: {
    //     client: 'postgresql',
    //     connection: {
    //         database: 'my_db',
    //         user: 'username',
    //         password: 'password'
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations'
    //     }
    // },

    // production: {
    //     client: 'postgresql',
    //     connection: {
    //         database: 'my_db',
    //         user: 'username',
    //         password: 'password'
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //         tableName: 'knex_migrations'
    //     }
    // }
};
