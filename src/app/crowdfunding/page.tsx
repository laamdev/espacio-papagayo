import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { TierForm } from "@/components/crowdfunding/tier-form";
import {
	type CampaignStatus,
	campaign,
	formatCents,
	getCampaignStatus,
	getDaysLeft,
	type Tier,
} from "@/lib/campaign";
import { getCampaignProgress } from "@/lib/campaign-progress";

export const metadata: Metadata = {
	title: campaign.name,
	description: campaign.summary,
	alternates: { canonical: "/crowdfunding" },
};

const shortDate = new Intl.DateTimeFormat("es-ES", {
	day: "numeric",
	month: "long",
	timeZone: "Europe/Madrid",
});

export default function CrowdfundingPage() {
	return (
		<main className="flex min-h-[100dvh] flex-col">
			<header className="bg-primary text-primary-foreground">
				<div className="mx-auto flex max-w-6xl flex-col gap-12 p-6 lg:gap-16 lg:p-10">
					<nav className="flex items-center justify-between gap-6">
						<Link
							href="/"
							className="tw-animation font-serif text-xl font-bold hover:text-primary-foreground/60"
						>
							Espacio Papagayo
						</Link>
						<Link
							href="/crowdfunding/condiciones"
							className="tw-animation text-sm font-medium hover:text-primary-foreground/60"
						>
							Condiciones
						</Link>
					</nav>

					<div className="flex flex-col gap-6">
						<h1 className="font-serif text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight">
							{campaign.name}
						</h1>
						<p className="max-w-xl text-lg leading-relaxed text-primary-foreground/90">
							{campaign.summary}
						</p>
					</div>

					<Suspense fallback={<ProgressSkeleton />}>
						<Progress />
					</Suspense>
				</div>
			</header>

			<section
				aria-labelledby="recompensas"
				className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 p-6 lg:p-10"
			>
				<h2
					id="recompensas"
					className="font-serif text-4xl font-bold tracking-tight"
				>
					Recompensas
				</h2>
				<Suspense fallback={<RewardsSkeleton />}>
					<Rewards />
				</Suspense>
			</section>

			<footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t p-6 text-sm text-muted-foreground lg:px-10">
				<p>Pago seguro con Stripe: tarjeta, Bizum, Apple Pay y Google Pay.</p>
				<p>
					¿Dudas? Escríbenos a{" "}
					<a
						href="mailto:info@espaciopapagayo.com"
						className="tw-animation font-medium text-foreground hover:text-primary"
					>
						info@espaciopapagayo.com
					</a>
				</p>
			</footer>
		</main>
	);
}

async function Progress() {
	await connection();
	const now = new Date();
	const status = getCampaignStatus(now);
	const { raised, backers } = await getCampaignProgress();
	const goal = campaign.goal * 100;
	const percent = Math.floor((raised / goal) * 100);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
				<p className="flex flex-wrap items-baseline gap-x-3">
					<span className="font-serif text-5xl font-bold tabular-nums lg:text-6xl">
						{formatCents(raised)}
					</span>
					<span className="text-primary-foreground/70">
						de {formatCents(goal)}
					</span>
				</p>
				<dl className="flex gap-10">
					<div className="flex flex-col-reverse">
						<dt className="text-sm text-primary-foreground/70">
							{backers === 1 ? "aportación" : "aportaciones"}
						</dt>
						<dd className="text-2xl font-bold tabular-nums">{backers}</dd>
					</div>
					<div className="flex flex-col-reverse">
						<dt className="text-sm text-primary-foreground/70">
							{statusCaption(status, now)}
						</dt>
						<dd className="text-2xl font-bold tabular-nums">
							{statusValue(status, now)}
						</dd>
					</div>
				</dl>
			</div>
			<div
				role="progressbar"
				aria-label="Progreso de la campaña"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={percent}
				className="h-3 overflow-hidden rounded-full bg-primary-foreground/20"
			>
				<div
					className="h-full rounded-full bg-primary-foreground transition-[width] duration-700"
					style={{ width: `${Math.min(percent, 100)}%` }}
				/>
			</div>
			<p className="text-sm text-primary-foreground/70">
				{percent} % del objetivo
			</p>
		</div>
	);
}

function statusValue(status: CampaignStatus, now: Date) {
	if (status === "upcoming")
		return shortDate.format(new Date(campaign.startsAt));
	if (status === "closed") return "Cerrada";
	return getDaysLeft(now);
}

function statusCaption(status: CampaignStatus, now: Date) {
	if (status === "upcoming") return "fecha de inicio";
	if (status === "closed") return "campaña terminada";
	return getDaysLeft(now) === 1 ? "día restante" : "días restantes";
}

async function Rewards() {
	await connection();
	const status = getCampaignStatus(new Date());
	const { byTier } = await getCampaignProgress();

	return (
		<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{campaign.tiers.map((tier, index) => {
				const left =
					tier.stock === undefined
						? undefined
						: Math.max(0, tier.stock - (byTier[tier.id] ?? 0));
				const soldOut = left === 0;

				return (
					<li
						key={tier.id}
						className="flex flex-col justify-between gap-8 rounded-xl border bg-card p-6"
					>
						<div className="flex flex-col gap-3">
							<span className="text-sm text-muted-foreground tabular-nums">
								{String(index + 1).padStart(2, "0")}
							</span>
							<h3 className="text-2xl font-bold leading-tight">{tier.name}</h3>
							<p className="font-serif text-3xl font-bold text-primary">
								{tier.price === undefined
									? "Importe libre"
									: formatCents(tier.price * 100)}
							</p>
							{tier.description && (
								<p className="leading-relaxed text-muted-foreground">
									{tier.description}
								</p>
							)}
							{left !== undefined && (
								<p className="text-sm font-medium">
									{soldOut ? "Agotada" : `Quedan ${left} de ${tier.stock}`}
								</p>
							)}
						</div>
						<TierForm
							tierId={tier.id}
							disabled={status !== "open" || soldOut}
							label={buttonLabel(tier, status, soldOut)}
							freeAmount={
								tier.price === undefined ? campaign.freeAmount : undefined
							}
						/>
					</li>
				);
			})}
		</ul>
	);
}

function buttonLabel(tier: Tier, status: CampaignStatus, soldOut: boolean) {
	if (status === "upcoming") return "Próximamente";
	if (status === "closed") return "Campaña cerrada";
	if (soldOut) return "Agotada";
	return tier.price === undefined ? "Aportar" : "Elegir";
}

function ProgressSkeleton() {
	return (
		<div className="flex animate-pulse flex-col gap-4" aria-hidden>
			<div className="h-14 w-64 rounded-lg bg-primary-foreground/15" />
			<div className="h-3 rounded-full bg-primary-foreground/15" />
			<div className="h-4 w-28 rounded bg-primary-foreground/15" />
		</div>
	);
}

function RewardsSkeleton() {
	return (
		<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
			{campaign.tiers.map((tier) => (
				<li key={tier.id} className="h-72 animate-pulse rounded-xl bg-muted" />
			))}
		</ul>
	);
}
