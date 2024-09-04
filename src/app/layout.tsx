import "@/styles/globals.css";

import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

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
			<body>
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
