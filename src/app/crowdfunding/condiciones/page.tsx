import type { Metadata } from "next";
import Link from "next/link";

// Estructura provisional. El texto definitivo lo aportan Espacio Papagayo y su
// asesoría; hasta entonces la página no se indexa.

export const metadata: Metadata = {
	title: "Condiciones de la campaña",
	robots: { index: false, follow: false },
};

const sections = [
	"Qué estás comprando",
	"Plazos de entrega",
	"Envíos y recogida en el taller",
	"Si no se alcanza el objetivo",
	"Desistimiento y devoluciones",
	"Facturas",
	"Datos personales",
	"Contacto",
];

export default function TermsPage() {
	return (
		<main className="mx-auto flex w-full max-w-3xl flex-col gap-10 p-6 lg:p-10">
			<Link
				href="/crowdfunding"
				className="tw-animation w-fit text-sm font-medium text-muted-foreground hover:text-primary"
			>
				← Volver a la campaña
			</Link>
			<h1 className="font-serif text-5xl font-bold tracking-tight">
				Condiciones de la campaña
			</h1>
			{sections.map((title) => (
				<section key={title} className="flex flex-col gap-3">
					<h2 className="text-2xl font-bold">{title}</h2>
					<p className="text-muted-foreground">
						Texto pendiente de Espacio Papagayo y su asesoría.
					</p>
				</section>
			))}
		</main>
	);
}
