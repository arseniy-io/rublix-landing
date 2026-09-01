import "@fontsource-variable/manrope";
import type { Metadata, Viewport } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rublix-wallet.com"),
  applicationName: "Rublix",
  authors: [{ name: "Rublix" }],
  creator: "Rublix",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f7f4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
