import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";

export function generrateMnemonic(): String {
    return generateMnemonic();
}

export function mnemonicToMasterSeed(mnemonic: string): Buffer {
  return mnemonicToSeedSync(mnemonic);
}

export function validatePhrase(mnemonic: string): boolean {
  return validateMnemonic(mnemonic);
}

export const CCOIN_TYPE = {
    ETHERIUM: "60",
    SOLANA: "501",
};

export interface DerivedWallet {
    publicKey: string;
    privateKey: string;
    path: string;
    coinType: string;
}