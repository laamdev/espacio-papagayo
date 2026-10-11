import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { campaign, formatCents, getTier } from "@/lib/campaign";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
	title: "Gracias",
	robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function ThanksPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	return (
		<main className="flex min-h-[100dvh] flex-col bg-primary text-primary-foreground">
			<div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 p-6 lg:p-10">
				<Link
					href="/"
					className="tw-animation w-fit font-serif text-xl font-bold hover:text-primary-foreground/60"
				>
					Espacio Papagayo
				</Link>
				<Suspense
					fallback={<p className="text-primary-foreground/70">Cargando…</p>}
				>
					<Summary searchParams={searchParams} />
				</Suspense>
			</div>
		</main>
	);
}

async function Summary({ searchParams }: { searchParams: SearchParams }) {
	const { session_id: sessionId } = await searchParams;
	const session = await findSession(sessionId);

	if (!session) {
		return (
			<Message title="No encontramos tu aportación">
				Si acabas de pagar, revisa el recibo que te ha llegado por email o
				escríbenos a info@espaciopapagayo.com.
			</Message>
		);
	}

	const tier = getTier(session.metadata?.tier ?? "");
	const name = session.customer_details?.name?.split(" ")[0];
	const email = session.customer_details?.email;
	const shipping = session.shipping_cost?.amount_total ?? 0;
	const paid = session.payment_status === "paid";

	return (
		<div className="flex flex-col gap-10">
			<Message title={name ? `Gracias, ${name}` : "Gracias"}>
				{paid
					? "Tu aportación se ha registrado correctamente."
					: "Estamos esperando la confirmación del pago. Te avisaremos por email."}
				{email && ` Te hemos enviado el recibo a ${email}.`}
			</Message>

			<dl className="grid gap-4 border-t border-primary-foreground/20 pt-6 sm:grid-cols-3">
				<Detail label="Recompensa" value={tier?.name ?? "—"} />
				<Detail
					label="Importe"
					value={formatCents(session.amount_subtotal ?? 0)}
				/>
				{shipping > 0 && <Detail label="Envío" value={formatCents(shipping)} />}
			</dl>

			<Link
				href="/crowdfunding"
				className="tw-animation w-fit font-bold hover:text-primary-foreground/60"
			>
				Volver a la campaña
			</Link>
		</div>
	);
}

async function findSession(sessionId: string | string[] | undefined) {
	if (typeof sessionId !== "string" || !sessionId.startsWith("cs_"))
		return null;
	if (!isStripeConfigured()) return null;
	try {
		const session = await getStripe().checkout.sessions.retrieve(sessionId);
		return session.metadata?.campaign === campaign.id ? session : null;
	} catch {
		return null;
	}
}

function Message({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="font-serif text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.92] tracking-tight">
				{title}
			</h1>
			<p className="max-w-xl text-lg leading-relaxed text-primary-foreground/90">
				{children}
			</p>
		</div>
	);
}

function Detail({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-1">
			<dt className="text-sm text-primary-foreground/70">{label}</dt>
			<dd className="text-xl font-bold">{value}</dd>
		</div>
	);
}
