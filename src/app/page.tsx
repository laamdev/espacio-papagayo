"use client";

import { motion } from "motion/react";
import Image from "next/image";

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

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
					className="mt-12"
				>
					<motion.div
						animate={{ y: [0, -14, 0], rotate: [0, -1.5, 0] }}
						transition={{
							duration: 6,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<Image
							src="/images/cover.webp"
							alt="Espacio Papagayo"
							width={320}
							height={320}
							priority
							className="w-44 rounded-2xl shadow-2xl ring-1 ring-primary-foreground/20 sm:w-56"
						/>
					</motion.div>
				</motion.div>
			</div>

			<motion.footer
				variants={fadeUp}
				initial="initial"
				animate="animate"
				transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
				className="flex flex-col items-center gap-2 px-6 pb-10 text-center text-sm sm:flex-row sm:justify-between sm:gap-4 sm:text-left"
			>
				<p className="text-primary-foreground/80">
					<a
						href="https://www.instagram.com/espaciopapagayo/"
						target="_blank"
						rel="noopener noreferrer"
						className="tw-animation hover:text-primary-foreground"
					>
						@espaciopapagayo
					</a>
					, un proyecto de{" "}
					<a
						href="https://juanserrano.studio"
						target="_blank"
						rel="noopener noreferrer"
						className="tw-animation hover:text-primary-foreground"
					>
						juanserrano.studio
					</a>
				</p>

				<p>
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
