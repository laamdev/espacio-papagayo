import { z } from "zod";

// Datos provisionales sacados del guion de la reunión del 9/10/2026.
// Precios, fechas, objetivo, textos y unidades los cierra Espacio Papagayo.

const tierSchema = z.object({
	id: z.string().regex(/^[a-z0-9-]+$/),
	name: z.string(),
	description: z.string().optional(),
	/** Precio en euros con IVA incluido. Ausente en la aportación libre. */
	price: z.number().int().positive().optional(),
	/** Unidades disponibles. Sin valor = ilimitadas. */
	stock: z.number().int().positive().optional(),
	/** Si la recompensa se envía o se recoge en el taller. */
	shipping: z.boolean(),
	sizes: z.array(z.string().regex(/^[A-Za-z0-9]+$/)).optional(),
});

const campaignSchema = z.object({
	id: z.string(),
	name: z.string(),
	summary: z.string(),
	/** Objetivo en euros. */
	goal: z.number().int().positive(),
	startsAt: z.iso.datetime({ offset: true }),
	endsAt: z.iso.datetime({ offset: true }),
	/** Aportaciones recibidas fuera de la web (en euros), para la barra. */
	offlineAmount: z.number().int().nonnegative(),
	offlineBackers: z.number().int().nonnegative(),
	/** Límites de la aportación libre, en euros. Bizum admite hasta 5.000 €. */
	freeAmount: z.object({
		min: z.number().int().positive(),
		max: z.number().int().positive(),
	}),
	shippingRates: z.array(
		z.object({ name: z.string(), amount: z.number().nonnegative() }),
	),
	/**
	 * Pide aceptar las condiciones en el checkout. Requiere configurar antes la
	 * URL de condiciones en el Dashboard de Stripe (Settings → Public details).
	 */
	termsConsent: z.boolean(),
	tiers: z.array(tierSchema).min(1),
});

export type Tier = z.infer<typeof tierSchema>;
export type Campaign = z.infer<typeof campaignSchema>;

export const campaign: Campaign = campaignSchema.parse({
	id: "apertura-2026",
	name: "Campaña de apertura",
	summary:
		"Preventa de piezas fabricadas en el taller para financiar la apertura de Espacio Papagayo. Las recompensas se entregan a partir de enero de 2027.",
	goal: 10000,
	startsAt: "2026-11-27T00:00:00+01:00",
	endsAt: "2026-12-21T23:59:59+01:00",
	offlineAmount: 0,
	offlineBackers: 0,
	freeAmount: { min: 5, max: 5000 },
	shippingRates: [
		{ name: "Recogida en el taller", amount: 0 },
		{ name: "Envío a domicilio (península)", amount: 6 },
	],
	termsConsent: false,
	tiers: [
		{
			id: "camiseta",
			name: "Camiseta Opening Edition",
			price: 35,
			shipping: true,
			sizes: ["S", "M", "L", "XL"],
		},
		{
			id: "objeto-escritorio",
			name: "Objeto de escritorio",
			price: 70,
			shipping: true,
		},
		{ id: "tabla", name: "Tabla de madera", price: 100, shipping: true },
		{ id: "taburete", name: "Taburete", price: 180, stock: 30, shipping: true },
		{
			id: "edicion-especial",
			name: "Edición especial",
			description: "Objeto grande y experiencia en el taller.",
			price: 300,
			stock: 10,
			shipping: true,
		},
		{ id: "aportacion-libre", name: "Aportación libre", shipping: false },
	],
});

export type CampaignStatus = "upcoming" | "open" | "closed";

export function getCampaignStatus(now: Date): CampaignStatus {
	if (process.env.CAMPAIGN_FORCE_OPEN === "true") return "open";
	if (now < new Date(campaign.startsAt)) return "upcoming";
	if (now > new Date(campaign.endsAt)) return "closed";
	return "open";
}

export function getDaysLeft(now: Date) {
	const ms = new Date(campaign.endsAt).getTime() - now.getTime();
	return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function getTier(id: string) {
	return campaign.tiers.find((tier) => tier.id === id);
}

const euros = new Intl.NumberFormat("es-ES", {
	style: "currency",
	currency: "EUR",
	maximumFractionDigits: 0,
});

/** Formatea céntimos como euros sin decimales. */
export function formatCents(cents: number) {
	return euros.format(cents / 100);
}
