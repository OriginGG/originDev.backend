exports.up = async function(knex) {
    return Promise.all([
        knex.table('origin.org_sponsors').whereIn('id',[1485,1484,1483,1482,1587,1588,1586,1589]).del()
    ])
};

exports.down = async function(knex) {

};
