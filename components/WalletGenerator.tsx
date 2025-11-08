'use client';

import { useState, useCallback } from 'react';
import { generatePhrase, validatePhrase } from '../lib/hd-wallet';
import { deriveSolanaWallet } from '../lib/solana';
import { deriveEthereumWallet } from '../lib/ethereum';

export default function WalletGenerator() {
	const [mnemonic, setMnemonic] = useState('');
	const [accounts, setAccounts] = useState<Array<{ solana: string; ethereum: string }>>([]);
	const [numAccounts, setNumAccounts] = useState(1);

	const generateNewWallet = useCallback(() => {
		const phrase = generatePhrase();
		setMnemonic(phrase);
		deriveAccounts(phrase, numAccounts);
	}, [numAccounts]);

	const deriveAccounts = useCallback((phrase: string, count: number) => {
		if (!validatePhrase(phrase)) {
			alert('Invalid mnemonic phrase');
			return;
		}

		const newAccounts = [];
		for (let i = 0; i < count; i++) {
			const solanaWallet = deriveSolanaWallet(phrase, i);
			const ethWallet = deriveEthereumWallet(phrase, i);
			newAccounts.push({
				solana: solanaWallet.publicKey,
				ethereum: ethWallet.publicKey,
			});
		}
		setAccounts(newAccounts);
	}, []);

	const handleImport = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const phrase = e.target.value;
		setMnemonic(phrase);
		if (validatePhrase(phrase)) {
			deriveAccounts(phrase, numAccounts);
		}
	}, [numAccounts, deriveAccounts]);

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={generateNewWallet}
						className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
					>
						Generate New Wallet
					</button>
					<div className="flex items-center gap-2">
						<label htmlFor="numAccounts">Number of accounts:</label>
						<input
							type="number"
							id="numAccounts"
							min="1"
							max="10"
							value={numAccounts}
							onChange={(e) => setNumAccounts(Number(e.target.value))}
							className="w-16 px-2 py-1 border rounded"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label htmlFor="mnemonic" className="block font-medium">
						Mnemonic Phrase:
					</label>
					<textarea
						id="mnemonic"
						value={mnemonic}
						onChange={handleImport}
						placeholder="Enter your 12 or 24 word mnemonic phrase"
						className="w-full p-2 border rounded min-h-[60px]"
					/>
				</div>

				{accounts.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Generated Accounts</h2>
						<div className="space-y-4">
							{accounts.map((account, i) => (
								<div key={i} className="p-4 border rounded space-y-2">
									<h3 className="font-medium">Account {i + 1}</h3>
									<div className="space-y-1">
										<p className="text-sm">
											<span className="font-medium">Solana:</span>{' '}
											<code className="bg-gray-100 px-1 py-0.5 rounded">{account.solana}</code>
										</p>
										<p className="text-sm">
											<span className="font-medium">Ethereum:</span>{' '}
											<code className="bg-gray-100 px-1 py-0.5 rounded">{account.ethereum}</code>
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

