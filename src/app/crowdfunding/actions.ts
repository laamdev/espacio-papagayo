"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type Stripe from "stripe";
import { z } from "zod";
import { campaign, getCampaignStatus, getTier } from "@/lib/campaign";
import { fetchCampaignProgress } from "@/lib/campaign-progress";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export type CheckoutState = { error?: string };

const inputSchema = z.object({
	tierId: z.string(),
	amount: z.coerce.number().int().optional(),
});

export async function startCheckout(
	_prev: CheckoutState,
	formData: FormData,
): Promise<CheckoutState> {
	const input = inputSchema.safeParse({
		tierId: formData.get("tierId"),
		amount: formData.get("amount") || undefined,
	});
	const tier = input.success ? getTier(input.data.tierId) : undefined;
	if (!input.success || !tier) {
		return { error: "Recompensa no válida." };
	}

	const status = getCampaignStatus(new Date());
	if (status !== "open") {
		return {
			error:
				status === "upcoming"
					? "La campaña todavía no ha empezado."
					: "La campaña ha terminado.",
		};
	}

	let euros = tier.price;
	if (euros === undefined) {
		const { min, max } = campaign.freeAmount;
		const amount = input.data.amount;
		if (amount === undefined || amount < min || amount > max) {
			return { error: `Indica un importe entre ${min} y ${max} €.` };
		}
		euros = amount;
	}

	if (!isStripeConfigured()) {
		return { error: "Los pagos todavía no están activados." };
	}

	if (tier.stock !== undefined) {
		const { byTier } = await fetchCampaignProgress();
		if ((byTier[tier.id] ?? 0) >= tier.stock) {
			return { error: "Esta recompensa se ha agotado." };
		}
	}

	// Next comprueba que el Origin de una Server Action coincide con el Host.
	const origin =
		(await headers()).get("origin") ?? "https://espaciopapagayo.com";
	const metadata = { campaign: campaign.id, tier: tier.id };
	const termsLink = `[condiciones de la campaña](${origin}/crowdfunding/condiciones)`;

	const params: Stripe.Checkout.SessionCreateParams = {
		mode: "payment",
		locale: "es",
		line_items: [
			{
				quantity: 1,
				price_data: {
					currency: "eur",
					unit_amount: euros * 100,
					product_data: {
						name: tier.name,
						description: tier.description,
						metadata,
					},
				},
			},
		],
		metadata,
		payment_intent_data: {
			metadata,
			description: `${campaign.name} · ${tier.name}`,
		},
		custom_text: campaign.termsConsent
			? {
					terms_of_service_acceptance: {
						message: `Acepto las ${termsLink}.`,
					},
				}
			: { submit: { message: `Al pagar aceptas las ${termsLink}.` } },
		consent_collection: campaign.termsConsent
			? { terms_of_service: "required" }
			: undefined,
		expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
		success_url: `${origin}/crowdfunding/gracias?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${origin}/crowdfunding`,
	};

	if (tier.shipping) {
		params.shipping_address_collection = { allowed_countries: ["ES"] };
		params.phone_number_collection = { enabled: true };
		params.shipping_options = campaign.shippingRates.map((rate) => ({
			shipping_rate_data: {
				type: "fixed_amount",
				display_name: rate.name,
				fixed_amount: { amount: rate.amount * 100, currency: "eur" },
			},
		}));
	}

	if (tier.sizes) {
		params.custom_fields = [
			{
				key: "talla",
				label: { type: "custom", custom: "Talla" },
				type: "dropdown",
				dropdown: {
					options: tier.sizes.map((size) => ({ label: size, value: size })),
				},
				optional: false,
			},
		];
	}

	let url: string | null;
	try {
		const session = await getStripe().checkout.sessions.create(params);
		url = session.url;
	} catch (error) {
		console.error("Error al crear la sesión de Stripe Checkout", error);
		url = null;
	}

	if (!url) {
		return { error: "No se ha podido iniciar el pago. Inténtalo de nuevo." };
	}
	redirect(url);
}
