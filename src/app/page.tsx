"use client";

import { motion } from "motion/react";

const fadeUp = {
	initial: { opacity: 0, y: 16, filter: "blur(8px)" },
	animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Home() {
	return (
		<main className="flex flex-1 flex-col bg-primary text-primary-foreground">
			<div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
				<motion.h1
					variants={fadeUp}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.9, ease: "easeOut" }}
					className="font-serif text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
				>
					Espacio Papagayo
				</motion.h1>

				<motion.p
					variants={fadeUp}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
					className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-primary-foreground/60"
				>
					coming soon
				</motion.p>
			</div>

			<motion.footer
				variants={fadeUp}
				initial="initial"
				animate="animate"
				transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
				className="grid grid-cols-1 gap-6 px-6 pb-10 text-center text-sm sm:grid-cols-3 sm:items-end sm:gap-4 sm:text-left"
			>
				<p className="text-primary-foreground/80">
					<a
						href="https://www.instagram.com/mueblesylibros/"
						target="_blank"
						rel="noopener noreferrer"
						className="tw-animation hover:text-primary-foreground"
					>
						@mueblesylibros
					</a>{" "}
					presenta:
					<br />
					<a
						href="https://www.instagram.com/espaciopapagayo/"
						target="_blank"
						rel="noopener noreferrer"
						className="tw-animation hover:text-primary-foreground"
					>
						@espaciopapagayo
					</a>
				</p>

				<p className="text-primary-foreground/80 sm:text-center">
					Un proyecto de{" "}
					<a
						href="https://juanserrano.studio"
						target="_blank"
						rel="noopener noreferrer"
						className="tw-animation hover:text-primary-foreground"
					>
						juanserrano.studio
					</a>
				</p>

				<p className="sm:text-right">
					<a
						href="mailto:info@espaciopapagayo.com"
						className="tw-animation hover:text-primary-foreground/70"
					>
						contacto
					</a>
				</p>
			</motion.footer>
		</main>
	);
}
