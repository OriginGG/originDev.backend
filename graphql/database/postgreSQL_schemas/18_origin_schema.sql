begin;

grant select, insert, update, delete on table origin.stripe_customers to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.stripe_customers_id_seq to origin_anonymous, origin_user, origin_admin;



commit;