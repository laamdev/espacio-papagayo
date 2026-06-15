import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
	src: [
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-25Th.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-26ThIt.woff2",
			weight: "100",
			style: "italic",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-35XLt.woff2",
			weight: "200",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-36XLtIt.woff2",
			weight: "200",
			style: "italic",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-45Lt.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-46LtIt.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-55Rg.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-56It.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-65Md.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-66MdIt.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-75Bd.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-76BdIt.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-95Blk.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../public/fonts/neue-haas-grotesk/display/NHaasGroteskDSPro-96BlkIt.woff2",
			weight: "900",
			style: "italic",
		},
	],
	variable: "--font-sans",
	display: "swap",
});

const serif = localFont({
	src: [
		{
			path: "../../public/fonts/voyage/voyage-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/voyage/voyage-bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-serif",
	display: "swap",
});

const SITE_URL = "https://espaciopapagayo.com";
const DESCRIPTION =
	"Espacio colaborativo de diseño y producción de proyectos en madera";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Espacio Papagayo",
		template: "%s | Espacio Papagayo",
	},
	description: DESCRIPTION,
	applicationName: "Espacio Papagayo",
	keywords: [
		"Espacio Papagayo",
		"diseño en madera",
		"carpintería",
		"ebanistería",
		"muebles a medida",
		"Madrid",
	],
	authors: [{ name: "Juan Serrano Studio", url: "https://juanserrano.studio" }],
	alternates: {
		canonical: SITE_URL,
	},
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: SITE_URL,
		siteName: "Espacio Papagayo",
		title: "Espacio Papagayo",
		description: DESCRIPTION,
		images: [
			{
				url: "/images/cover.webp",
				width: 960,
				height: 960,
				alt: "Espacio Papagayo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Espacio Papagayo",
		description: DESCRIPTION,
		images: ["/images/cover.webp"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Espacio Papagayo",
	alternateName: "@espaciopapagayo",
	description: DESCRIPTION,
	url: SITE_URL,
	email: "info@espaciopapagayo.com",
	logo: `${SITE_URL}/images/cover.webp`,
	image: `${SITE_URL}/images/cover.webp`,
	founder: {
		"@type": "Organization",
		name: "Juan Serrano Studio",
		url: "https://juanserrano.studio",
	},
	sameAs: ["https://www.instagram.com/espaciopapagayo/"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="es"
			className={`${sans.variable} ${serif.variable} h-full font-sans antialiased`}
		>
			<body className="flex min-h-full flex-col">
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data must be serialized into a script tag
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{children}
			</body>
		</html>
	);
}
