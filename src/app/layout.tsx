import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import ClientProviders from "./providers";

export const metadata = {
  title: "Gymstagram",
  description: "gymmmmmmmmm",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClientProviders>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
