import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactNode } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  CloverWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SOLANA_RPC } from "@/config";

require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaWalletProvider = ({ children }: { children: ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = SOLANA_RPC;

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new LedgerWalletAdapter(),
    new CloverWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
