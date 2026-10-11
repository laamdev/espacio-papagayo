import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type Stripe from "stripe";
import { campaign } from "@/lib/campaign";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const PROGRESS_TAG = "campaign-progress";

export type CampaignProgress = {
	/** Recaudado en céntimos, sin gastos de envío y descontando reembolsos. */
	raised: number;
	backers: number;
	/** Aportaciones pagadas por recompensa, para controlar el stock. */
	byTier: Record<string, number>;
};

/** Lee el progreso directamente de Stripe, sin caché. */
export async function fetchCampaignProgress(): Promise<CampaignProgress> {
	const progress: CampaignProgress = {
		raised: campaign.offlineAmount * 100,
		backers: campaign.offlineBackers,
		byTier: {},
	};

	if (!isStripeConfigured()) {
		console.warn("Stripe no está configurado: el progreso se muestra a cero");
		return progress;
	}

	const sessions = getStripe().checkout.sessions.list({
		status: "complete",
		limit: 100,
		expand: ["data.payment_intent.latest_charge"],
	});

	for await (const session of sessions) {
		if (session.metadata?.campaign !== campaign.id) continue;
		if (session.payment_status !== "paid") continue;

		const charge = getCharge(session);
		if (charge?.refunded) continue;

		const subtotal = session.amount_subtotal ?? 0;
		const refunded = Math.min(charge?.amount_refunded ?? 0, subtotal);
		progress.raised += subtotal - refunded;
		progress.backers += 1;

		const tierId = session.metadata.tier;
		if (tierId) progress.byTier[tierId] = (progress.byTier[tierId] ?? 0) + 1;
	}

	return progress;
}

/** Progreso cacheado; el webhook de Stripe lo invalida con cada pago o reembolso. */
export async function getCampaignProgress() {
	"use cache";
	cacheTag(PROGRESS_TAG);
	cacheLife("minutes");
	return fetchCampaignProgress();
}

function getCharge(session: Stripe.Checkout.Session) {
	const intent = session.payment_intent;
	if (!intent || typeof intent === "string") return null;
	const charge = intent.latest_charge;
	if (!charge || typeof charge === "string") return null;
	return charge;
}
