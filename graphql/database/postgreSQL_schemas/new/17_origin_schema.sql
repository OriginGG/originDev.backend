begin;

-- grant select, insert, update, delete on table origin.stripe_products to origin_anonymous, origin_user, origin_admin;
-- grant usage on sequence origin.stripe_products_id_seq to origin_anonymous, origin_user, origin_admin;

-- grant select, insert, update, delete on table origin.stripe_plans to origin_anonymous, origin_user, origin_admin;
-- grant usage on sequence  origin.stripe_plans_id_seq to origin_anonymous, origin_user, origin_admin;


commit;