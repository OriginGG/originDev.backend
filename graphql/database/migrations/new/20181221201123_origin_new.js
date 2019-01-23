
const fs = require('fs');

function execute_sql(fname, knex) {
    return new Promise((resolve) => {
        console.log(__dirname);
        fs.readFile(`${__dirname}/../../postgreSQL_schemas/new/${fname}`, 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            Promise.all([
                knex.raw(data),
            ]).then(() => {
                console.log(`new sql functions ${fname}`);
                resolve(true);
            })
        });
    })
}

exports.up = function (knex, Promise) {
    console.log('new sql functions - begin');
    return new Promise(async (resolve) => {
        for (let i = 1; i < 44; i++) {
            await execute_sql(`${i}_origin_schema.sql`, knex);
        }
        resolve(true);
    })
};

exports.down = function (knex, Promise) {
    return new Promise((resolve) => {
        resolve(true);
    });
};

