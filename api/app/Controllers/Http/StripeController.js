'use strict'

const stripe = require("stripe")("sk_test_Xc3IYeOkJ8ePvctNS9MmTpxk");
const Database = use('Database');

class StripeController {
    async create_subscription({ response, request }) {
        try {
            const bd = request.all();
            // create a customer first.
            const customer_id = bd.customer_id;
            const plan_name = bd.plan_name;
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
                // stripe.subscriptions.create({
                //     customer: "cus_DaP2hGjDXQhstk",
                //     items: [
                //         {
                //             plan: "gold",
                //         },
                //     ]
                // }, function (err, subscription) {
                //     // asynchronously called
                // }
                // );
                customer_id_token = cust.id;
            } else {
                customer_id_token = exists[0].customer_id_token;
            }

            const plans = await Database.from('stripe_plans').where('plan_name', plan_name)
            const sub = await stripe.subscriptions.create({
                customer: customer_id_token,
                items: [
                    {
                        plan: plans[0].plan_id_token,
                    },
                ]
            });
            response.json({ status: "subscribed", sub });
        } catch (err) {
            response.json({ status: "error", code: err.code });
        }
    }
    async create_product_and_plans({ response, request }) {
        try {
            const product = await stripe.products.create({
                name: 'OriginGG',
                type: 'service',
            });
            console.log(product);

            // const bd = request.all();
            let status = await stripe.plans.create({
                amount: 50,
                interval: "month",
                product: product.id,
                currency: "usd",
            });
            const prod_id = await Database
                .table('stripe_products')
                .insert({
                    product_id_token: product.id,
                    name: product.name,
                    active: product.active
                }).returning('id');
            await Database
                .table('stripe_plans')
                .insert({
                    product_id: prod_id[0],
                    plan_id_token: status.id,
                    interval: status.interval,
                    interval_count: status.interval_count,
                    amount: status.amount,
                    currency: status.currency,
                    active: status.active,
                    plan_name: 'standard',
                    active: status.active,
                    billing_scheme: status.billing_scheme,
                });

            response.json({ success: true });
        } catch (err) {
            response.json({ status: "error" });
        }
    }

}

module.exports = StripeController
