import "server-only";

import Stripe from "stripe";

let client: Stripe | undefined;

export function isStripeConfigured() {
	return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe() {
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) {
		throw new Error("Falta la variable de entorno STRIPE_SECRET_KEY");
	}
	client ??= new Stripe(key);
	return client;
}
