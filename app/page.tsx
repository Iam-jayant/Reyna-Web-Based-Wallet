"use client";

import WalletGenerator from '../components/WalletGenerator';

export default function Home() {
	return (
		<main className="min-h-screen bg-white">
			<div className="container mx-auto py-8">
				<h1 className="text-3xl font-bold text-center mb-8">Reyna Web-Based HD Wallet</h1>
				<WalletGenerator />
			</div>
		</main>
	);
}
