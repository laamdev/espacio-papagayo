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

export const metadata: Metadata = {
	title: "Espacio Papagayo",
	description: "Espacio Papagayo",
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
			<body className="flex min-h-full flex-col">{children}</body>
		</html>
	);
}
