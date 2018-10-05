// Update with your config settings.

module.exports = {
    local:{
        client:'postgresql',
        connection:{
            host:'localhost',
            database:'OriginLocal',
            user:'postgres',
            password:'allegro1234',
            port:5433
        },
        pool:{
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        },
        seeds: {
            tableName: 'knex_seeds',
            directory: './seeds'
        }
    },
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
            directory: './migrations'
        },
        seeds: {
            tableName: 'knex_seeds',
            directory: './seeds'
        }
    },
     production: {
        client: 'postgresql',
        connection: {
            host: 'origin-production-small.cjdraitfnk0j.us-east-1.rds.amazonaws.com',
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
            directory: './migrations'
        },
        seeds: {
            tableName: 'knex_seeds',
            directory: './seeds'
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
