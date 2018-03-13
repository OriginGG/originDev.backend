let createRecord = (knex,  o, bt, bc, bm, ca, ua) => {
    return knex('origin.blogs').insert({
        organisation: o,
        blog_title: bt,
        blog_content: bc,
        blog_media: bm,
        created_at: ca,
        updated_at: ua,
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create Blogs');

    return knex('origin.blogs')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(knex,
                    'ascendant',
                    'We Are Live',
                    '<p>We are exited to announce the launch of Ascendant Gaming.  Please follow us on our social media channels to stay up to date on competitions and events.</p>',
                    'CoD-4-Header.jpg',
                    '2018-02-19T15:16:54.546Z',
                    '2018-02-19T19:19:08.208Z'
                )
            );
            records.push(
                createRecord(knex,
                    'ascendant',
                    'Cod Announcement',
                    '<p>Ascendant Gaming is a new esports organization. Our name is derived from a core</p><p>value and common mentality of our staff and players, and that is rising above. With a</p><p>focus on growing as a community, we look to bring new ideas to the world of esports,</p><p>and deliver our fans not only results in game, but a positive environment and stream of</p><p>media outside of professional play.</p><p><br></p><p>For us, finding the right team wasn’t just going out and finding a roster with experience</p><p>and talent. The competition in professional Call of Duty is more intense than ever, and</p><p>there’s a wealth of talent in the open league play.</p><p><br></p><p>We knew we needed some of the best to match that level of competition, but we also</p><p>needed to find a roster that shared our goals and visions of what an organization can</p><p>be. These players are not only masters of the game, but they fit that bill perfectly.</p><p>With that in mind, we’re excited to reveal our Call of Duty World War II roster, a team of</p><p>world class players, with rich histories in CoD esports. A team with the dedication and</p><p>determination to rise to the top again, Ascendant Gaming.</p><p><br></p><p>Adam \"KiLLa​\" Sloss is a veteran of professional Call of Duty, dating back to Black Ops</p><p>2, where he claimed a World Champion title with Fariko Impact in the Call of Duty</p><p>Championship 2013. Since then KiLLa has continued to play at the highest level, seeing</p><p>success with teams such as OpTic Nation and XGN Competitive. After taking time off</p><p>from professional play after the birth of his daughter, KiLLa is back on the grind and</p><p>excited for World War II, looking to reach the top once again.</p><p>https://twitter.com/K1Ila</p><p><br></p><p>Longtime teammate and also former World Champions Marcus \"MiRx​\" Carter is once</p><p>again playing alongside KiLLa. As part of Fariko Impact, MiRx also cemented his title as</p><p>World Champion in 2013, however he’s been a competitive gamer dating back to</p><p>Rainbow Six Vegas when it was on the pro circuit. MiRx has already competed in</p><p>multiple CWL Opens in WWII, however couldn’t find a roster with which he believed in</p><p>until now, and is looking forward to the next open in Atlanta in March.</p><p>https://twitter.com/MiRx</p><p><br></p><p>Joining them, Brandon \"Sharp​\" Rodgers is another storied name in Call of Duty, dating</p><p>back to a first place winning at MLG National Championships in 2009. Sharp would go</p><p>on to see tremendous success with Team Kaliber in Black Ops 2, and would claim MVP</p><p>at AEL Dallas in 2014. Sharp would move on to YouTube, focusing on building a</p><p>fanbase, however the release of WWII has him once again putting all of his efforts into</p><p>competitive CoD. Following undesirable results with PURE Gaming, Sharp has moved</p><p>on to find a roster he expects can achieve the results he’s after.</p><p>https://twitter.com/Sharp_tK</p><p><br></p><p>Jeremy \"Neslo​\" Olsen rounds out the squad, as Team Captain and the duo to Sharp.</p><p>As an original member of Team Kaliber, it was in Black Ops 2 that Neslo would really</p><p>explode into the professional scene. After his time with TK, Neslo would find himself</p><p>with Echo Fox for both Black Ops 3 and Infinite Warfare, however struggled to find</p><p>himself back at the top. After a year of falling short of his personal goals and</p><p>expectations, he would leave Echo Fox. Looking to WWII, Neslo brings a positive</p><p>energy and direction to the team, with a sole focus on claiming a spot at the top of the</p><p>league once again.  https://twitter.com/Neslo</p><p><br></p><p>These four players have seen the pinnacle of success throughout their careers, have</p><p>been staple names in the history of Call of Duty. However, they have also fallen from</p><p>those heights and experienced the struggles of trying to return to that former glory and</p><p>success. The story of 2018 will be how these players return to that top, and how from</p><p>the bottom once again they Ascend.</p><p><br></p><p>\"I\'m excited for this team.The past couple years for our careers have been pretty rough,</p > <p>so we have a lot of similarities. We all know what it\'s like to be on a top tier team, and</p> <p>we need it back. Our goal is very simple, show people we are serious, show them we</p> <p>still have that drive, and perform as well as we can. It\'s like starting over with a brand</p> <p>new team, but were excited to build.\" -Neslo, Ascendant Call of Duty Team Captain</p> <p><br></p><p>“Ascendant Gaming is a new esports organization that is about to take off, with new and</p><p>revolutionary ideas that no one has seen before, and we are launching at the start with this</p><p>great team because we see how amazing they are as people as well as players. These type</p><p>of players don’t come around often, so when you get the chance to work with them, it’s an</p><p>opportunity you can’t pass up.” -Tanner, Ascendant Gaming CEO</p>',
                    '48231.jpg',
                    '2018-02-18T20:05:58.459Z',
                    '2018-02-18T20:05:58.459Z'
                )
            );
            return Promise.all(records);
        })
        .then(() => {
            return knex.raw(
                'alter sequence origin.blogs_id_seq restart with 3'
            );
        });
    
};
