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

					<p className="max-w-sm text-base leading-relaxed text-primary-foreground/90">
						Espacio colaborativo de diseño y producción de proyectos en madera.
					</p>
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
				className="group relative min-h-[50vh] overflow-hidden bg-primary lg:h-full lg:min-h-0"
			>
				{/* Full-color image, revealed on hover */}
				<Image
					src="/images/cover.webp"
					alt="Espacio Papagayo"
					fill
					priority
					sizes="(min-width: 1024px) 50vw, 100vw"
					className="object-cover"
				/>
				{/* Blue duotone layer, fades out on hover */}
				<div className="pointer-events-none absolute inset-0 bg-primary transition-opacity duration-700 ease-out group-hover:opacity-0">
					<Image
						src="/images/cover.webp"
						alt=""
						aria-hidden
						fill
						sizes="(min-width: 1024px) 50vw, 100vw"
						className="object-cover opacity-95 mix-blend-luminosity"
					/>
				</div>

				{/* Rotating "coming soon" badge */}
				<div className="pointer-events-none absolute right-5 top-5 z-20 grid h-24 w-24 place-items-center rounded-full bg-background shadow-lg lg:right-8 lg:top-8 lg:h-28 lg:w-28">
					<svg
						viewBox="0 0 100 100"
						className="h-full w-full animate-spin-slow"
						aria-hidden
					>
						<title>Coming soon</title>
						<defs>
							<path
								id="badge-curve"
								d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
								fill="none"
							/>
						</defs>
						<text className="fill-primary text-[9.5px] font-bold uppercase [letter-spacing:0.16em]">
							<textPath href="#badge-curve" startOffset="0">
								Coming soon • Coming soon •
							</textPath>
						</text>
					</svg>
				</div>
			</motion.div>
		</main>
	);
}
