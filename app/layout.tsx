import './global.css';

export const metadata = {
  title: 'Reyna HD Wallet',
  description: 'Simple HD wallet for Ethereum and Solana',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
