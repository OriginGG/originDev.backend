
const fs = require('fs');

exports.up = function (knex, Promise) {
    console.log('new sql functions  19- begin');
    return new Promise((resolve) => {
        console.log(__dirname);
        fs.readFile(`${__dirname}/../postgreSQL_schemas/19_origin_schema.sql`, 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            Promise.all([
                knex.raw(data),
            ]).then(() => {
                console.log('new sql functions 19');
                resolve(true);
            })
        });
    })


};

exports.down = function (knex, Promise) {
    return new Promise((resolve) => {
        resolve(true);
    });
};

