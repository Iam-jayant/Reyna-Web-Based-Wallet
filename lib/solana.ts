import { mnemonicToMasterSeed, COIN_TYPE, DerivedWallet } from "./hd-wallet";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

function u8ToHex(u8: Uint8Array): string {
  return Array.from(u8).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function deriveSolanaWallet(mnemonic: string, account = 0, change = 0): DerivedWallet {
  const seed = mnemonicToMasterSeed(mnemonic);
  const path = `m/44'/${COIN_TYPE.SOLANA}'/${account}'/${change}'`;
  const { key } = derivePath(path, u8ToHex(seed));
  const pair = nacl.sign.keyPair.fromSeed(key);
  const keypair = Keypair.fromSecretKey(pair.secretKey);

  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: btoa(String.fromCharCode(...keypair.secretKey)),
    path,
    coinType: COIN_TYPE.SOLANA
  };
}
