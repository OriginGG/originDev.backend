begin;

create or replace function origin.getinduserbyusername(username text) returns setof origin.individual_users as $$
  	select sc.* from origin.individual_users as sc
    where lower(sc.username)= lower($1);
$$ language sql stable;


grant execute on function origin.getinduserbyusername(text) to origin_anonymous;


commit;