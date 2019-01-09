begin;

create or replace function origin.getorganisationbyname(subdomain text) returns setof origin.organisation_account as $$
  	select sc.* from origin.organisation_account as sc
    where lower(sc.sub_domain)= lower($1);
$$ language sql stable;


grant execute on function origin.getorganisationbyname(text) to origin_anonymous;


commit;