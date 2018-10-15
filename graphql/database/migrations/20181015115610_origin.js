exports.up = function (knex,Promise) {
  
    return Promise.all(([
    // roster table and roster_indiviudal table  
    knex.schema.raw('UPDATE origin.content_team SET id = id + 100'),
    knex.schema.raw('WITH Q1 AS (UPDATE origin.staff SET id = id + 300) UPDATE origin.staff_individuals SET staff_id = staff_id + 300'),
    knex.schema.raw('INSERT INTO origin.combined_rosters(id,created_at,updated_at,game_id,sub_domain) SELECT id,created_at,updated_at,game_id,sub_domain FROM origin.rosters'),
     knex.schema.raw('INSERT INTO origin.combined_roster_individuals(roster_id,individual_id,created_at,updated_at) SELECT roster_id,individual_id,created_at,updated_at FROM origin.roster_individuals'),
     knex('origin.combined_rosters').update({roster_type: 'competitive'}),
     knex('origin.combined_roster_individuals').update({individual_type:'competitive'}),
     
    // content_team table
     knex.schema.raw('INSERT INTO origin.combined_rosters(id,created_at,updated_at) SELECT id,created_at,updated_at FROM origin.content_team'),
     knex('origin.combined_rosters').where('roster_type',null).update({roster_type:'content_team'}),

     knex.schema.raw('INSERT INTO origin.combined_rosters(id,created_at,updated_at,sub_domain,position_id) SELECT id,created_at,updated_at,sub_domain,position_id FROM origin.staff'),
     knex('origin.combined_rosters').where('roster_type',null).update({roster_type:'staff'}),
    
    knex.schema.raw('INSERT INTO origin.combined_roster_individuals(roster_id,individual_id,created_at,updated_at) SELECT staff_id AS roster_id,individual_id,created_at,updated_at FROM origin.staff_individuals'),
    knex('origin.combined_roster_individuals').where('individual_type',null).update({individual_type:'staff'})
     // 
    //  knex.schema.raw('INSERT INTO origin.combined_roster_individuals(roster_id,individual_id,created_at,updated_at) SELECT id AS roster_id,member_id xd, created_at,updated_at FROM origin.content_team')
    // 
    ]))
}
;

exports.down = async function (knex) {

};