import "@/styles/globals.css";

import { Outfit } from "next/font/google";
import type { Metadata } from "next";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Projeto Simples",
	description: "Projeto Simples",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${outfit.className}`}>
			<body className="dark">{children}</body>
		</html>
	);
}
