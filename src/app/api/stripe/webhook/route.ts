import { revalidateTag } from "next/cache";
import type Stripe from "stripe";
import { PROGRESS_TAG } from "@/lib/campaign-progress";
import { getStripe } from "@/lib/stripe";

const PROGRESS_EVENTS = new Set<Stripe.Event["type"]>([
	"checkout.session.completed",
	"checkout.session.async_payment_succeeded",
	"charge.refunded",
]);

export async function POST(request: Request) {
	const secret = process.env.STRIPE_WEBHOOK_SECRET;
	const signature = request.headers.get("stripe-signature");
	if (!secret || !signature) {
		return new Response("Webhook no configurado", { status: 400 });
	}

	let event: Stripe.Event;
	try {
		event = getStripe().webhooks.constructEvent(
			await request.text(),
			signature,
			secret,
		);
	} catch (error) {
		console.error("Firma de webhook de Stripe no válida", error);
		return new Response("Firma no válida", { status: 400 });
	}

	if (PROGRESS_EVENTS.has(event.type)) {
		revalidateTag(PROGRESS_TAG, { expire: 0 });
	}

	return Response.json({ received: true });
}
