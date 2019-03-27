'use strict';
const Env = use('Env');
const stripe = require('stripe')(Env.get('APP_STRIPE_SK_KEY'));
const Database = use('Database');

class StripeController {
	async retrieve_plans({ response, request }) {
		const bd = request.all();
		const p = await stripe.plans.list({ product: bd.product });
		response.json(p);
	}
	async create_customer({ response, request }) {
		const bd = request.all();
		const exists = await stripe.customers.list({ limit: 1, email: bd.email });
		if (exists.data.length > 0) {
			response.json({ status: 'customer already exists' });
		} else {
			const cust = await stripe.customers.create({
				email: bd.email,
				metadata: { userId: bd.user_id },
				description: `Customer - ${bd.email}`
			});
			response.json({ status: 'success', cust });
		}
	}
	async update_customer({ response, request }) {
		const bd = request.all();
		const customer = bd.customer;
		const options = bd.options;
		try {
			const cust = await stripe.customers.update(customer, {
				source: options.token
			});
			response.json({ status: 'success', cust });
		} catch (err) {
			console.log(err);
			response.json({ status: 'error', code: err.code });
		}
	}
	async retrieve_customer({ response, request }) {
		const bd = request.all();
		const exists = await stripe.customers.list({ limit: 1, email: bd.email });
		if (exists.data.length > 0) {
			response.json({ success: true, customer: exists.data[0] });
		} else {
			response.json({ success: false });
		}
	}
	async create_subscription({ response, request }) {
		try {
			const bd = request.all();
			const customer_id = bd.customer_id;
			// create a customer first.
			const plan = bd.plan;
			const trial_period_days = bd.trial_period_days;
			const sub = await stripe.subscriptions.create({
				customer: customer_id,
				trial_period_days,
				items: [
					{
						plan
					}
				]
			});
			response.json({ status: 'subscribed', sub });
		} catch (err) {
			response.json({ status: 'error', code: err.code });
		}
	}
	async delete_subscription({ response, request }) {
		const bd = request.all();
		await stripe.subscriptions.del(
			bd.id
		);
		response.json({ status: 'deleted'});

	}
	async update_subscription({ response, request }) {
		try {
			const bd = request.all();
			const sub = await stripe.subscriptions.update(bd);
			response.json({ status: 'subscribed', sub });
		} catch (err) {
			response.json({ status: 'error', code: err.code });
		}
	}
	async cancel_subscription({ response, request }) {
		const b = request.all();
		const { customer } = b.data.object;
		try {
			const c = await stripe.customers.retrieve(
				customer
			);
			const user = await Database.from('users').where('id', c.metadata.userId);
			if (user.length > 0) {
				await Database.table('users').where('id', user[0].id).update('subscribed', false);
				response.json({ status: 'subscription_cancelled' });
			} else {
				response.json({ status: 'customer found, but no associated user!' });
			}
		} catch (err) {
			response.json({status: 'error', error: 'cannot find customer or subscription'})
		}
	}
	async trial_expired({ response, request }) {
		const b = request.all();
		const { customer } = b.data.object;
		try {
			const c = await stripe.customers.retrieve(
				customer
			);
			debugger;
			const user = await Database.from('users').where('id', c.metadata.userId);
			if (user.length > 0) {
				if (!c.default_source) {
					await Database.table('users').where('id', user[0].id).update('subscribed', false);
					response.json({ status: 'trial endded - subscription_cancelled' });
				} else {
					response.json({ status: 'trial ended -  but paid customer' });
				}
			} else {
				response.json({ status: 'customer found, but no associated user!' });
			}
		} catch (err) {
			response.json({ status: 'error', error: 'cannot find customer or subscription' })
		}
	}
}

module.exports = StripeController;
