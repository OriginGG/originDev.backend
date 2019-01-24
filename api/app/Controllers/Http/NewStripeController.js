'use strict'
const Env = use('Env')
const stripe = require("stripe")(Env.get('APP_STRIPE_SK_KEY'));
const Database = use('Database');


class StripeController {
    async retrieve_plans({ response, request }) {
        const bd = request.all();
        const p = await stripe.plans.list({ product: bd.product })
        response.json(p);
    }
    async create_subscription({ response, request }) {
        try {
            const bd = request.all();
            // create a customer first.
            const plan = bd.plan;
            const trial_period_days = bd.trial_period_days;
            const customer_id = bd.customer_id;
            const exists = await Database.from('stripe_customers').where('user_id', customer_id)
            const user = await Database.from('users').where('id', customer_id)
            let db_cust_id = 0;
            let customer_id_token = null;
            if (exists.length === 0) {
                // does customer already exist?
                const cust = await stripe.customers.create({
                    email: user[0].email,
                    description: `Customer - ${user[0].email}`,
                    source: bd.token
                });
                db_cust_id = await Database
                    .table('stripe_customers')
                    .insert({
                        user_id: customer_id,
                        customer_id_token: cust.id,
                        default_source: cust.default_source,
                        description: cust.description,
                        invoice_prefix: cust.invoice_prefix,
                        email: cust.email
                    }).returning('id');
                customer_id_token = cust.id;
            } else {
                customer_id_token = exists[0].customer_id_token;
            }
            const sub = await stripe.subscriptions.create({
                customer: customer_id_token,
                trial_period_days,
                items: [
                    {
                        plan,
                    },
                ],
            });
            response.json({ status: "subscribed", sub });
        } catch (err) {
            response.json({ status: "error", code: err.code });
        }
    }
    async cancel_subscription({ response, request }) {
        const b = request.all();
        const { customer } = b.data.object;
        const exists = await Database.from('stripe_customers').where('customer_id_token', customer)
        if (exists.length > 0) {
            const user = await Database.from('users').where('id', exists[0].user_id);
            if (user.length > 0) {
                await Database
                    .table('users')
                    .where('id', user[0].id)
                    .update('subscribed', false);
                response.json({ status: "subscription_cancelled" });
            }
            else {
                response.json({ status: "customer found, but no associated user!" });
            }
        } else {
            response.json({ status: "error - customer not found!" });

        }

    }
}

module.exports = StripeController
