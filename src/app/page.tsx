"use client";

import { motion } from "motion/react";
import Image from "next/image";

const fadeUp = {
	initial: { opacity: 0, y: 16, filter: "blur(8px)" },
	animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Home() {
	return (
		<main className="grid min-h-[100dvh] grid-cols-1 bg-primary text-primary-foreground lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
			{/* Left: title + text */}
			<section className="flex flex-col justify-between gap-12 p-6 lg:h-full lg:p-10">
				<motion.div
					variants={fadeUp}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.9, ease: "easeOut" }}
					className="flex flex-col gap-12"
				>
					<h1 className="font-serif text-[clamp(3rem,10vw,9.5rem)] font-bold leading-[0.92] tracking-tight">
						Espacio
						<br />
						Papagayo
					</h1>

					<div className="space-y-3">
						<p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground/60">
							Coming soon
						</p>
						<p className="max-w-sm text-base leading-relaxed text-primary-foreground/90">
							Espacio colaborativo de diseño y producción de proyectos en
							madera.
						</p>
					</div>
				</motion.div>

				<motion.div
					variants={fadeUp}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
					className="flex flex-col gap-8"
				>
					<nav className="flex flex-col gap-1 text-2xl font-bold">
						<a
							href="https://www.instagram.com/espaciopapagayo/"
							target="_blank"
							rel="noopener noreferrer"
							className="tw-animation w-fit hover:text-primary-foreground/60"
						>
							Instagram
						</a>
						<a
							href="mailto:info@espaciopapagayo.com"
							className="tw-animation w-fit hover:text-primary-foreground/60"
						>
							Contacto
						</a>
					</nav>

					<p className="text-sm text-primary-foreground/70">
						Un proyecto de{" "}
						<a
							href="https://juanserrano.studio"
							target="_blank"
							rel="noopener noreferrer"
							className="tw-animation font-medium text-primary-foreground hover:text-primary-foreground/60"
						>
							juanserrano.studio
						</a>
					</p>
				</motion.div>
			</section>

			{/* Right: image */}
			<motion.div
				variants={fadeUp}
				initial="initial"
				animate="animate"
				transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
				className="relative min-h-[50vh] bg-primary lg:min-h-0 lg:h-full"
			>
				<Image
					src="/images/cover.webp"
					alt="Espacio Papagayo"
					fill
					priority
					sizes="(min-width: 1024px) 50vw, 100vw"
					className="object-cover opacity-95 mix-blend-luminosity"
				/>
			</motion.div>
		</main>
	);
}
