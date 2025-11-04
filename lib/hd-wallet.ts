import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";

export function generatePhrase(strength: 128 | 256 = 128): string {
  return generateMnemonic(strength);
}

export function normalizeMnemonic(input: string): string {
  return input.trim().toLowerCase().split(/\s+/).join(" ");
}

export function validatePhrase(mnemonic: string): boolean {
  return validateMnemonic(normalizeMnemonic(mnemonic));
}

export function mnemonicToMasterSeed(mnemonic: string, passphrase = ""): Uint8Array {
  const m = normalizeMnemonic(mnemonic);
  if (!validateMnemonic(m)) {
    throw new Error("Invalid mnemonic");
  }
  const seed = mnemonicToSeedSync(m, passphrase);
  return new Uint8Array(seed);
}

export const COIN_TYPE = {
  ETHEREUM: 60,
  SOLANA: 501,
} as const;

export type CoinType = typeof COIN_TYPE[keyof typeof COIN_TYPE];

export interface DerivedWallet {
  publicKey: string;
  privateKey?: string;
  path: string;
  coinType: CoinType;
}